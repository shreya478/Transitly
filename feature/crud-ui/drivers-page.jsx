import React, { useState } from 'react';
import { mockDrivers } from './mockData';
import DriverForm from './DriverForm';

// Wrap the data source in a single function for easy swapping later
export function getDrivers() {
  return mockDrivers;
}

// User's current local date is 2026-07-12
const BASE_DATE = new Date('2026-07-12');

// Function to check if license is expired or expiring within 30 days
function getExpiryWarning(expiryDateStr) {
  const expiryDate = new Date(expiryDateStr);
  if (isNaN(expiryDate.getTime())) return null;

  // Set times to midnight for precise date calculations
  const baseMidnight = new Date(BASE_DATE.getFullYear(), BASE_DATE.getMonth(), BASE_DATE.getDate());
  const expiryMidnight = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());

  const diffTime = expiryMidnight - baseMidnight;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { type: 'expired', label: 'Expired', color: '#d93025', bgColor: '#fce8e6' };
  } else if (diffDays <= 30) {
    return { type: 'expiring-soon', label: `Expiring in ${diffDays} day${diffDays === 1 ? '' : 's'}`, color: '#b06000', bgColor: '#fef7e0' };
  }
  return null;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState(() => getDrivers());
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Search/Filter state
  const [filterSearch, setFilterSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Handle adding a new driver
  const handleSaveDriver = (newDriver) => {
    setDrivers((prev) => [newDriver, ...prev]);
    setIsFormOpen(false);
  };

  // Filter logic
  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = !filterSearch || 
      driver.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(filterSearch.toLowerCase());
    const matchesStatus = !filterStatus || driver.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitleContainer}>
          <h1 style={styles.title}>Driver Management</h1>
          <p style={styles.subtitle}>View, filter, and track driver compliance and status</p>
        </div>
        <button style={styles.addButton} onClick={() => setIsFormOpen(true)}>
          Add Driver
        </button>
      </header>

      {/* Filters Section */}
      <section style={styles.filterSection}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Search Driver</label>
          <input
            type="text"
            placeholder="Search by name or license..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
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
            <option value="Off Duty">Off Duty</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        {(filterSearch || filterStatus) && (
          <button
            onClick={() => {
              setFilterSearch('');
              setFilterStatus('');
            }}
            style={styles.clearBtn}
          >
            Clear Filters
          </button>
        )}
      </section>

      {/* Table Section */}
      <main style={styles.tableContainer}>
        {filteredDrivers.length === 0 ? (
          <div style={styles.emptyState}>
            No drivers match the filter criteria.
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>License Number</th>
                <th style={styles.th}>License Category</th>
                <th style={styles.th}>License Expiry Date</th>
                <th style={styles.th}>Contact Number</th>
                <th style={styles.th}>Safety Score</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => {
                const expiryWarning = getExpiryWarning(driver.licenseExpiry);
                return (
                  <tr key={driver.licenseNumber} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.nameCell}>
                        {driver.name}
                        {expiryWarning && (
                          <span
                            title={expiryWarning.label}
                            style={{
                              ...styles.warningFlag,
                              color: expiryWarning.color,
                              backgroundColor: expiryWarning.bgColor,
                              borderColor: expiryWarning.color
                            }}
                          >
                            ⚠️ {expiryWarning.type === 'expired' ? 'Expired' : 'Expiring Soon'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ ...styles.td, ...styles.monoCell }}>{driver.licenseNumber}</td>
                    <td style={styles.td}>{driver.licenseCategory}</td>
                    <td style={styles.td}>
                      <span style={expiryWarning ? { color: expiryWarning.color, fontWeight: '600' } : {}}>
                        {driver.licenseExpiry}
                      </span>
                    </td>
                    <td style={styles.td}>{driver.contactNumber}</td>
                    <td style={styles.td}>
                      <div style={styles.scoreContainer}>
                        <span style={styles.scoreVal}>{driver.safetyScore}</span>
                        <div style={styles.scoreBarBg}>
                          <div 
                            style={{
                              ...styles.scoreBarFill,
                              width: `${driver.safetyScore}%`,
                              backgroundColor: driver.safetyScore >= 90 ? '#137333' : driver.safetyScore >= 80 ? '#b06000' : '#c5221f'
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.statusBadge, ...statusStyles[driver.status] }}>
                        {driver.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>

      {/* Status Legend Section */}
      <footer style={styles.legendContainer}>
        <span style={styles.legendTitle}>Status Legend:</span>
        <div style={styles.legendItems}>
          <div style={styles.legendItem}>
            <span style={{ ...styles.legendBadge, ...statusStyles.Available }}>Available</span>
            <span style={styles.legendText}>Ready for dispatch</span>
          </div>
          <div style={styles.legendItem}>
            <span style={{ ...styles.legendBadge, ...statusStyles['On Trip'] }}>On Trip</span>
            <span style={styles.legendText}>Currently driving on a dispatch</span>
          </div>
          <div style={styles.legendItem}>
            <span style={{ ...styles.legendBadge, ...statusStyles['Off Duty'] }}>Off Duty</span>
            <span style={styles.legendText}>Resting or on leave</span>
          </div>
          <div style={styles.legendItem}>
            <span style={{ ...styles.legendBadge, ...statusStyles.Suspended }}>Suspended</span>
            <span style={styles.legendText}>License issue or safety hold</span>
          </div>
        </div>
      </footer>

      {/* Modal Dialog for Form */}
      {isFormOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <DriverForm
              onSave={handleSaveDriver}
              onCancel={() => setIsFormOpen(false)}
              existingLicenseNumbers={drivers.map(d => d.licenseNumber)}
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
  'Off Duty': {
    backgroundColor: '#fef7e0',
    color: '#b06000',
  },
  Suspended: {
    backgroundColor: '#fce8e6',
    color: '#c5221f',
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
    marginBottom: '24px',
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
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  warningFlag: {
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid',
    fontWeight: '700',
  },
  monoCell: {
    fontFamily: 'monospace',
    fontWeight: '600',
    color: '#111',
  },
  scoreContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  scoreVal: {
    fontWeight: '600',
    minWidth: '24px',
  },
  scoreBarBg: {
    width: '60px',
    height: '6px',
    backgroundColor: '#eee',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: '3px',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
  },
  legendContainer: {
    backgroundColor: '#fff',
    padding: '16px 20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  legendTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#666',
  },
  legendItems: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendBadge: {
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '600',
  },
  legendText: {
    fontSize: '12px',
    color: '#666',
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
