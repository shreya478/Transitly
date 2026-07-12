import React, { useState } from 'react';
import { canDispatchTrip, canCompleteTrip, canCancelTrip } from '../../feature/business_logic/tripRules.js';
import { mockTrips, mockVehicles, mockDrivers } from './mockData';

// Wrap the data source in getTrips() at the top for easy swapping later
export function getTrips() {
  return mockTrips;
}

export default function TripsPage() {
  const [trips, setTrips] = useState(() => getTrips());
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [drivers, setDrivers] = useState(mockDrivers);

  // Form state
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicleReg, setSelectedVehicleReg] = useState('');
  const [selectedDriverName, setSelectedDriverName] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [formError, setFormError] = useState('');

  // Kanban action & validation states
  const [cardErrors, setCardErrors] = useState({});
  const [activeCompleteTripId, setActiveCompleteTripId] = useState(null);
  const [finalOdometer, setFinalOdometer] = useState('');
  const [fuelConsumed, setFuelConsumed] = useState('');

  // Handle trip creation
  const handleCreateTrip = (e) => {
    e.preventDefault();

    // Basic required-field validation
    if (
      !source.trim() ||
      !destination.trim() ||
      !selectedVehicleReg ||
      !selectedDriverName ||
      !cargoWeight ||
      !distance
    ) {
      setFormError('All fields are required.');
      return;
    }

    const weightNum = parseFloat(cargoWeight);
    const distNum = parseFloat(distance);

    if (isNaN(weightNum) || weightNum <= 0) {
      setFormError('Cargo weight must be a positive number.');
      return;
    }

    if (isNaN(distNum) || distNum <= 0) {
      setFormError('Planned distance must be a positive number.');
      return;
    }

    const newTrip = {
      id: `t-${Date.now()}`,
      source: source.trim(),
      destination: destination.trim(),
      vehicleRegistrationNumber: selectedVehicleReg,
      driverName: selectedDriverName,
      cargoWeight: weightNum,
      distance: distNum,
      status: 'Draft',
      dateCreated: new Date().toISOString().split('T')[0]
    };

    setTrips((prev) => [newTrip, ...prev]);

    // Clear form
    setSource('');
    setDestination('');
    setSelectedVehicleReg('');
    setSelectedDriverName('');
    setCargoWeight('');
    setDistance('');
    setFormError('');
  };

  // Handle Dispatch click
  const handleDispatch = (trip) => {
    const vehicle = vehicles.find((v) => v.registrationNumber === trip.vehicleRegistrationNumber);
    const driver = drivers.find((d) => d.name === trip.driverName);

    // Map properties from camelCase to snake_case as expected by business rules
    const tripObj = {
      ...trip,
      cargo_weight: Number(trip.cargoWeight)
    };

    const vehicleObj = vehicle
      ? {
          ...vehicle,
          max_load_capacity: vehicle.maxLoadCapacity
        }
      : null;

    const driverObj = driver
      ? {
          ...driver,
          license_expiry: driver.licenseExpiry
        }
      : null;

    const validationResult = canDispatchTrip(tripObj, vehicleObj, driverObj);

    if (validationResult.ok) {
      setTrips((prev) =>
        prev.map((t) => (t.id === trip.id ? { ...t, status: 'Dispatched' } : t))
      );
      // Clear error on success
      setCardErrors((prev) => {
        const copy = { ...prev };
        delete copy[trip.id];
        return copy;
      });
    } else {
      setCardErrors((prev) => ({
        ...prev,
        [trip.id]: validationResult.reason || 'Cannot dispatch trip.'
      }));
    }
  };

  // Handle Complete submission
  const handleCompleteSubmit = (e, trip) => {
    e.preventDefault();

    const odoNum = parseFloat(finalOdometer);
    const fuelNum = parseFloat(fuelConsumed);

    if (isNaN(odoNum) || odoNum <= 0) {
      setCardErrors((prev) => ({
        ...prev,
        [trip.id]: 'Final odometer must be a positive number.'
      }));
      return;
    }

    if (isNaN(fuelNum) || fuelNum <= 0) {
      setCardErrors((prev) => ({
        ...prev,
        [trip.id]: 'Fuel consumed must be a positive number.'
      }));
      return;
    }

    const tripObj = {
      ...trip,
      cargo_weight: Number(trip.cargoWeight)
    };

    const validationResult = canCompleteTrip(tripObj, odoNum, fuelNum);

    if (validationResult.ok) {
      setTrips((prev) =>
        prev.map((t) => (t.id === trip.id ? { ...t, status: 'Completed' } : t))
      );
      setCardErrors((prev) => {
        const copy = { ...prev };
        delete copy[trip.id];
        return copy;
      });
      setActiveCompleteTripId(null);
      setFinalOdometer('');
      setFuelConsumed('');
    } else {
      setCardErrors((prev) => ({
        ...prev,
        [trip.id]: validationResult.reason || 'Cannot complete trip.'
      }));
    }
  };

  // Handle Cancel click
  const handleCancel = (trip) => {
    const tripObj = {
      ...trip,
      cargo_weight: Number(trip.cargoWeight)
    };

    const validationResult = canCancelTrip(tripObj);

    if (validationResult.ok) {
      setTrips((prev) =>
        prev.map((t) => (t.id === trip.id ? { ...t, status: 'Cancelled' } : t))
      );
      setCardErrors((prev) => {
        const copy = { ...prev };
        delete copy[trip.id];
        return copy;
      });
      if (activeCompleteTripId === trip.id) {
        setActiveCompleteTripId(null);
        setFinalOdometer('');
        setFuelConsumed('');
      }
    } else {
      setCardErrors((prev) => ({
        ...prev,
        [trip.id]: validationResult.reason || 'Cannot cancel trip.'
      }));
    }
  };

  // Group trips by status
  const draftTrips = trips.filter((t) => t.status === 'Draft');
  const dispatchedTrips = trips.filter((t) => t.status === 'Dispatched');
  const completedTrips = trips.filter((t) => t.status === 'Completed');
  const cancelledTrips = trips.filter((t) => t.status === 'Cancelled');

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitleContainer}>
          <h1 style={styles.title}>Trip Dispatch & Tracking</h1>
          <p style={styles.subtitle}>Create, manage, and dispatch active fleet trips</p>
        </div>
      </header>

      <div style={styles.layoutGrid}>
        {/* LEFT PANEL - Create Trip form */}
        <aside style={styles.formPanel}>
          <h2 style={styles.panelTitle}>Create New Trip</h2>
          {formError && <div style={styles.formError}>{formError}</div>}
          <form onSubmit={handleCreateTrip} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Source</label>
              <input
                type="text"
                placeholder="e.g. Chicago, IL"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Destination</label>
              <input
                type="text"
                placeholder="e.g. Indianapolis, IN"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Vehicle</label>
              <select
                value={selectedVehicleReg}
                onChange={(e) => setSelectedVehicleReg(e.target.value)}
                style={styles.formSelect}
              >
                <option value="">Select a Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.registrationNumber} value={vehicle.registrationNumber}>
                    {vehicle.registrationNumber} - {vehicle.name} ({vehicle.status})
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Driver</label>
              <select
                value={selectedDriverName}
                onChange={(e) => setSelectedDriverName(e.target.value)}
                style={styles.formSelect}
              >
                <option value="">Select a Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.name} value={driver.name}>
                    {driver.name} ({driver.status})
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Cargo Weight (kg)</label>
              <input
                type="number"
                placeholder="e.g. 1200"
                value={cargoWeight}
                onChange={(e) => setCargoWeight(e.target.value)}
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Planned Distance (km)</label>
              <input
                type="number"
                placeholder="e.g. 180"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                style={styles.formInput}
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Create Trip
            </button>
          </form>
        </aside>

        {/* RIGHT PANEL - Live Board */}
        <main style={styles.boardPanel}>
          <div style={styles.boardHeader}>
            <h2 style={styles.panelTitle}>Live Board</h2>
          </div>

          <div style={styles.boardGrid}>
            {/* DRAFT COLUMN */}
            <div style={styles.kanbanColumn}>
              <div style={{ ...styles.columnHeader, ...columnHeaderStyles.Draft }}>
                <span>Draft</span>
                <span style={styles.columnCount}>{draftTrips.length}</span>
              </div>
              <div style={styles.columnBody}>
                {draftTrips.map((trip) => (
                  <div key={trip.id} style={styles.card}>
                    <div style={styles.cardRoute}>
                      {trip.source} <span style={styles.arrow}>➔</span> {trip.destination}
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Vehicle:</strong> <span style={styles.mono}>{trip.vehicleRegistrationNumber}</span>
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Driver:</strong> {trip.driverName}
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Cargo Weight:</strong> {trip.cargoWeight} kg
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Distance:</strong> {trip.distance} km
                    </div>
                    
                    <button
                      onClick={() => handleDispatch(trip)}
                      style={styles.actionButtonPrimary}
                    >
                      Dispatch
                    </button>

                    {cardErrors[trip.id] && (
                      <div style={styles.cardError}>{cardErrors[trip.id]}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* DISPATCHED COLUMN */}
            <div style={styles.kanbanColumn}>
              <div style={{ ...styles.columnHeader, ...columnHeaderStyles.Dispatched }}>
                <span>Dispatched</span>
                <span style={styles.columnCount}>{dispatchedTrips.length}</span>
              </div>
              <div style={styles.columnBody}>
                {dispatchedTrips.map((trip) => {
                  const isCompleting = activeCompleteTripId === trip.id;
                  return (
                    <div key={trip.id} style={styles.card}>
                      <div style={styles.cardRoute}>
                        {trip.source} <span style={styles.arrow}>➔</span> {trip.destination}
                      </div>
                      <div style={styles.cardDetail}>
                        <strong>Vehicle:</strong> <span style={styles.mono}>{trip.vehicleRegistrationNumber}</span>
                      </div>
                      <div style={styles.cardDetail}>
                        <strong>Driver:</strong> {trip.driverName}
                      </div>
                      <div style={styles.cardDetail}>
                        <strong>Cargo Weight:</strong> {trip.cargoWeight} kg
                      </div>
                      <div style={styles.cardDetail}>
                        <strong>Distance:</strong> {trip.distance} km
                      </div>

                      {isCompleting ? (
                        <form
                          onSubmit={(e) => handleCompleteSubmit(e, trip)}
                          style={styles.inlineForm}
                        >
                          <div style={styles.inlineFormGroup}>
                            <label style={styles.inlineFormLabel}>Final Odometer (km)</label>
                            <input
                              type="number"
                              required
                              value={finalOdometer}
                              onChange={(e) => setFinalOdometer(e.target.value)}
                              style={styles.inlineInput}
                            />
                          </div>
                          <div style={styles.inlineFormGroup}>
                            <label style={styles.inlineFormLabel}>Fuel Consumed (L)</label>
                            <input
                              type="number"
                              required
                              value={fuelConsumed}
                              onChange={(e) => setFuelConsumed(e.target.value)}
                              style={styles.inlineInput}
                            />
                          </div>
                          <div style={styles.inlineActions}>
                            <button type="submit" style={styles.inlineSubmitBtn}>
                              Submit Completion
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveCompleteTripId(null);
                                setCardErrors((prev) => {
                                  const copy = { ...prev };
                                  delete copy[trip.id];
                                  return copy;
                                });
                              }}
                              style={styles.inlineCancelBtn}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div style={styles.cardActionsRow}>
                          <button
                            onClick={() => {
                              setActiveCompleteTripId(trip.id);
                              setFinalOdometer('');
                              setFuelConsumed('');
                              setCardErrors((prev) => {
                                const copy = { ...prev };
                                delete copy[trip.id];
                                return copy;
                              });
                            }}
                            style={styles.actionButtonSuccess}
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleCancel(trip)}
                            style={styles.actionButtonDanger}
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {cardErrors[trip.id] && (
                        <div style={styles.cardError}>{cardErrors[trip.id]}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COMPLETED COLUMN */}
            <div style={styles.kanbanColumn}>
              <div style={{ ...styles.columnHeader, ...columnHeaderStyles.Completed }}>
                <span>Completed</span>
                <span style={styles.columnCount}>{completedTrips.length}</span>
              </div>
              <div style={styles.columnBody}>
                {completedTrips.map((trip) => (
                  <div key={trip.id} style={styles.card}>
                    <div style={styles.cardRoute}>
                      {trip.source} <span style={styles.arrow}>➔</span> {trip.destination}
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Vehicle:</strong> <span style={styles.mono}>{trip.vehicleRegistrationNumber}</span>
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Driver:</strong> {trip.driverName}
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Cargo Weight:</strong> {trip.cargoWeight} kg
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Distance:</strong> {trip.distance} km
                    </div>
                    <div style={styles.dateCreatedBadge}>
                      Created: {trip.dateCreated}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CANCELLED COLUMN */}
            <div style={styles.kanbanColumn}>
              <div style={{ ...styles.columnHeader, ...columnHeaderStyles.Cancelled }}>
                <span>Cancelled</span>
                <span style={styles.columnCount}>{cancelledTrips.length}</span>
              </div>
              <div style={styles.columnBody}>
                {cancelledTrips.map((trip) => (
                  <div key={trip.id} style={styles.card}>
                    <div style={styles.cardRoute}>
                      {trip.source} <span style={styles.arrow}>➔</span> {trip.destination}
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Vehicle:</strong> <span style={styles.mono}>{trip.vehicleRegistrationNumber}</span>
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Driver:</strong> {trip.driverName}
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Cargo Weight:</strong> {trip.cargoWeight} kg
                    </div>
                    <div style={styles.cardDetail}>
                      <strong>Distance:</strong> {trip.distance} km
                    </div>
                    <div style={styles.dateCreatedBadge}>
                      Created: {trip.dateCreated}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const columnHeaderStyles = {
  Draft: {
    backgroundColor: '#dadce0',
    color: '#3c4043'
  },
  Dispatched: {
    backgroundColor: '#1a73e8',
    color: '#fff'
  },
  Completed: {
    backgroundColor: '#137333',
    color: '#fff'
  },
  Cancelled: {
    backgroundColor: '#c5221f',
    color: '#fff'
  }
};

const styles = {
  container: {
    padding: '32px',
    maxWidth: '1280px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#333',
    backgroundColor: '#fafafa',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '24px'
  },
  headerTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111',
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    margin: 0
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '32px',
    alignItems: 'start'
  },
  formPanel: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    border: '1px solid #eee'
  },
  boardPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  panelTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111',
    margin: '0 0 16px 0'
  },
  boardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px'
  },
  formLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  formInput: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#333'
  },
  formSelect: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#333',
    cursor: 'pointer'
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#1a73e8',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(26, 115, 232, 0.2)',
    transition: 'background-color 0.2s',
    marginTop: '8px'
  },
  formError: {
    color: '#c5221f',
    backgroundColor: '#fce8e6',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    marginBottom: '16px',
    fontWeight: '500',
    border: '1px solid #fad2cf'
  },
  boardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    alignItems: 'start'
  },
  kanbanColumn: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column'
  },
  columnHeader: {
    padding: '12px 14px',
    borderTopLeftRadius: '7px',
    borderTopRightRadius: '7px',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  columnCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '600',
    color: 'inherit'
  },
  columnBody: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    overflowY: 'auto'
  },
  card: {
    backgroundColor: '#fff',
    padding: '14px',
    borderRadius: '6px',
    border: '1px solid #dadce0',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'relative'
  },
  cardRoute: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#111',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '6px',
    borderBottom: '1px solid #f1f3f4',
    paddingBottom: '8px',
    marginBottom: '4px'
  },
  arrow: {
    color: '#1a73e8'
  },
  cardDetail: {
    fontSize: '12px',
    color: '#555',
    lineHeight: '1.4'
  },
  mono: {
    fontFamily: 'monospace',
    fontWeight: '600',
    color: '#111',
    backgroundColor: '#f1f3f4',
    padding: '2px 4px',
    borderRadius: '4px'
  },
  actionButtonPrimary: {
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#1a73e8',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '6px',
    transition: 'background-color 0.15s'
  },
  actionButtonSuccess: {
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#137333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
    transition: 'background-color 0.15s'
  },
  actionButtonDanger: {
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#d93025',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
    transition: 'background-color 0.15s'
  },
  cardActionsRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '6px'
  },
  dateCreatedBadge: {
    fontSize: '10px',
    color: '#888',
    marginTop: '4px',
    borderTop: '1px solid #f1f3f4',
    paddingTop: '6px'
  },
  cardError: {
    color: '#c5221f',
    backgroundColor: '#fce8e6',
    border: '1px solid #fad2cf',
    borderRadius: '4px',
    padding: '6px 10px',
    fontSize: '11px',
    fontWeight: '500',
    marginTop: '8px',
    wordBreak: 'break-word',
    lineHeight: '1.3'
  },
  inlineForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    marginTop: '8px'
  },
  inlineFormGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  inlineFormLabel: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase'
  },
  inlineInput: {
    padding: '6px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#333'
  },
  inlineActions: {
    display: 'flex',
    gap: '6px',
    marginTop: '4px'
  },
  inlineSubmitBtn: {
    padding: '6px 10px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#137333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 2
  },
  inlineCancelBtn: {
    padding: '6px 10px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#5f6368',
    backgroundColor: '#fff',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1
  }
};
