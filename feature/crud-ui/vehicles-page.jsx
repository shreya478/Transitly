import React, { useState } from 'react';
import { mockVehicles } from './mockData';
import VehicleForm from './VehicleForm';

// Wrap the data source in a single function for easy swapping later
export function getVehicles() {
  return mockVehicles;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState(() => getVehicles());
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Search/Filter state
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRegion, setFilterRegion] = useState('');

  // Handle adding a new vehicle
  const handleSaveVehicle = (newVehicle) => {
    setVehicles((prev) => [newVehicle, ...prev]);
    setIsFormOpen(false);
  };

  // Filter logic
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesType = !filterType || vehicle.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesStatus = !filterStatus || vehicle.status === filterStatus;
    const matchesRegion = !filterRegion || vehicle.region.toLowerCase().includes(filterRegion.toLowerCase());
    return matchesType && matchesStatus && matchesRegion;
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitleContainer}>
          <h1 style={styles.title}>Vehicle Management</h1>
          <p style={styles.subtitle}>View, filter, and add fleet vehicles</p>
        </div>
        <button style={styles.addButton} onClick={() => setIsFormOpen(true)}>
          Add Vehicle
        </button>
      </header>

      {/* Filters Section */}
      <section style={styles.filterSection}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Search by Type</label>
          <input
            type="text"
            placeholder="e.g. Cargo Van"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={styles.filterInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Search by Region</label>
          <input
            type="text"
            placeholder="e.g. North"
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            style={styles.filterInput}
          />
        </div>

        {(filterType || filterStatus || filterRegion) && (
          <button
            onClick={() => {
              setFilterType('');
              setFilterStatus('');
              setFilterRegion('');
            }}
            style={styles.clearBtn}
          >
            Clear Filters
          </button>
        )}
      </section>

      {/* Table Section */}
      <main style={styles.tableContainer}>
        {filteredVehicles.length === 0 ? (
          <div style={styles.emptyState}>
            No vehicles match the filter criteria.
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Registration Number</th>
                <th style={styles.th}>Name/Model</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Max Load Capacity (kg)</th>
                <th style={styles.th}>Odometer (km)</th>
                <th style={styles.th}>Acquisition Cost ($)</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.registrationNumber} style={styles.tr}>
                  <td style={{ ...styles.td, ...styles.regCell }}>{vehicle.registrationNumber}</td>
                  <td style={styles.td}>{vehicle.name}</td>
                  <td style={styles.td}>{vehicle.type}</td>
                  <td style={styles.td}>{vehicle.maxLoadCapacity.toLocaleString()}</td>
                  <td style={styles.td}>{vehicle.odometer.toLocaleString()}</td>
                  <td style={styles.td}>${vehicle.acquisitionCost.toLocaleString()}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, ...statusStyles[vehicle.status] }}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td style={styles.td}>{vehicle.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* Modal Dialog for Form */}
      {isFormOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <VehicleForm
              onSave={handleSaveVehicle}
              onCancel={() => setIsFormOpen(false)}
              existingRegNumbers={vehicles.map(v => v.registrationNumber)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const statusStyles = {
  Available: {
    backgroundColor: '#e6f4ea',
    color: '#137333',
  },
  'On Trip': {
    backgroundColor: '#e8f0fe',
    color: '#1a73e8',
  },
  'In Shop': {
    backgroundColor: '#fef7e0',
    color: '#b06000',
  },
  Retired: {
    backgroundColor: '#f1f3f4',
    color: '#3c4043',
  }
};

const styles = {
  container: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#333',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  headerTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  addButton: {
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
  },
  filterSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    padding: '16px 20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: '200px',
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  filterInput: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  filterSelect: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    outline: 'none',
  },
  clearBtn: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#d93025',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeaderRow: {
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #eee',
  },
  th: {
    padding: '16px 20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#555',
    textTransform: 'uppercase',
  },
  tr: {
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.15s',
  },
  td: {
    padding: '16px 20px',
    fontSize: '14px',
    color: '#333',
    verticalAlign: 'middle',
  },
  regCell: {
    fontFamily: 'monospace',
    fontWeight: '600',
    color: '#111',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
  },
  emptyState: {
    padding: '40px',
    textAlign: 'center',
    color: '#777',
    fontSize: '16px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
  }
};
