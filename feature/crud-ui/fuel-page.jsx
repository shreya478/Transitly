import React, { useState } from 'react';
import { mockFuelLogs, mockExpenses, mockVehicles } from './mockData';

// Wrap data sources at the top
export function getFuelLogs() {
  return mockFuelLogs;
}

export function getExpenses() {
  return mockExpenses;
}

export default function FuelPage() {
  const [fuelLogs, setFuelLogs] = useState(() => getFuelLogs());
  const [expenses, setExpenses] = useState(() => getExpenses());

  // Form visibility states
  const [isFuelFormOpen, setIsFuelFormOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

  // Form states
  const [fuelFormData, setFuelFormData] = useState({
    vehicleRegistrationNumber: '',
    date: '2026-07-12',
    liters: '',
    cost: ''
  });
  const [fuelErrors, setFuelErrors] = useState({});

  const [expenseFormData, setExpenseFormData] = useState({
    vehicleRegistrationNumber: '',
    type: 'Toll',
    date: '2026-07-12',
    amount: '',
    notes: ''
  });
  const [expenseErrors, setExpenseErrors] = useState({});

  // Totals calculations
  const totalFuelCost = fuelLogs.reduce((sum, log) => sum + Number(log.cost), 0);
  const totalExpenseCost = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const totalOperationalCost = totalFuelCost + totalExpenseCost;

  // Handle Fuel Submit
  const handleFuelSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!fuelFormData.vehicleRegistrationNumber) errors.vehicleRegistrationNumber = 'Vehicle is required.';
    if (!fuelFormData.date) errors.date = 'Date is required.';
    if (!fuelFormData.liters || isNaN(Number(fuelFormData.liters)) || Number(fuelFormData.liters) <= 0) {
      errors.liters = 'Liters must be a positive number.';
    }
    if (!fuelFormData.cost || isNaN(Number(fuelFormData.cost)) || Number(fuelFormData.cost) <= 0) {
      errors.cost = 'Cost must be a positive number.';
    }

    if (Object.keys(errors).length > 0) {
      setFuelErrors(errors);
      return;
    }

    const newLog = {
      vehicleRegistrationNumber: fuelFormData.vehicleRegistrationNumber,
      date: fuelFormData.date,
      liters: Number(fuelFormData.liters),
      cost: Number(fuelFormData.cost)
    };

    setFuelLogs((prev) => [newLog, ...prev]);
    setIsFuelFormOpen(false);
    setFuelFormData({ vehicleRegistrationNumber: '', date: '2026-07-12', liters: '', cost: '' });
    setFuelErrors({});
  };

  // Handle Expense Submit
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!expenseFormData.vehicleRegistrationNumber) errors.vehicleRegistrationNumber = 'Vehicle is required.';
    if (!expenseFormData.type) errors.type = 'Expense type is required.';
    if (!expenseFormData.date) errors.date = 'Date is required.';
    if (!expenseFormData.amount || isNaN(Number(expenseFormData.amount)) || Number(expenseFormData.amount) <= 0) {
      errors.amount = 'Amount must be a positive number.';
    }

    if (Object.keys(errors).length > 0) {
      setExpenseErrors(errors);
      return;
    }

    const newExpense = {
      vehicleRegistrationNumber: expenseFormData.vehicleRegistrationNumber,
      type: expenseFormData.type,
      date: expenseFormData.date,
      amount: Number(expenseFormData.amount),
      notes: expenseFormData.notes.trim()
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setIsExpenseFormOpen(false);
    setExpenseFormData({ vehicleRegistrationNumber: '', type: 'Toll', date: '2026-07-12', amount: '', notes: '' });
    setExpenseErrors({});
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitleContainer}>
          <h1 style={styles.title}>Fleet Operations & Cost Logs</h1>
          <p style={styles.subtitle}>Track fuel consumption and miscellaneous vehicle expenses</p>
        </div>
      </header>

      {/* Operational Cost Summary Card */}
      <section style={styles.summaryCard}>
        <div style={styles.summaryInfo}>
          <span style={styles.summaryLabel}>Total Operational Cost</span>
          <h2 style={styles.summaryValue}>${totalOperationalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        </div>
        <div style={styles.summaryDetails}>
          <div style={styles.summaryDetailItem}>
            <span style={styles.detailLabel}>Total Fuel Cost</span>
            <span style={styles.detailValue}>${totalFuelCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div style={styles.summaryDetailItemDivider} />
          <div style={styles.summaryDetailItem}>
            <span style={styles.detailLabel}>Other Expenses</span>
            <span style={styles.detailValue}>${totalExpenseCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </section>

      {/* Grid Layout for the two sections */}
      <div style={styles.sectionsContainer}>
        {/* SECTION 1: FUEL LOG */}
        <section style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Fuel Log</h3>
            {!isFuelFormOpen && (
              <button style={styles.addButton} onClick={() => setIsFuelFormOpen(true)}>
                + Log Fuel
              </button>
            )}
          </div>

          {isFuelFormOpen && (
            <form onSubmit={handleFuelSubmit} style={styles.inlineForm}>
              <h4 style={styles.formTitle}>Log Fuel Purchase</h4>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Vehicle *</label>
                  <select
                    value={fuelFormData.vehicleRegistrationNumber}
                    onChange={(e) => setFuelFormData({ ...fuelFormData, vehicleRegistrationNumber: e.target.value })}
                    style={{ ...styles.formInput, ...(fuelErrors.vehicleRegistrationNumber ? styles.inputError : {}) }}
                  >
                    <option value="">Select Vehicle</option>
                    {mockVehicles.map(v => (
                      <option key={v.registrationNumber} value={v.registrationNumber}>
                        {v.registrationNumber} - {v.name}
                      </option>
                    ))}
                  </select>
                  {fuelErrors.vehicleRegistrationNumber && <span style={styles.errorText}>{fuelErrors.vehicleRegistrationNumber}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Date *</label>
                  <input
                    type="date"
                    value={fuelFormData.date}
                    onChange={(e) => setFuelFormData({ ...fuelFormData, date: e.target.value })}
                    style={{ ...styles.formInput, ...(fuelErrors.date ? styles.inputError : {}) }}
                  />
                  {fuelErrors.date && <span style={styles.errorText}>{fuelErrors.date}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Liters *</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 55"
                    value={fuelFormData.liters}
                    onChange={(e) => setFuelFormData({ ...fuelFormData, liters: e.target.value })}
                    style={{ ...styles.formInput, ...(fuelErrors.liters ? styles.inputError : {}) }}
                  />
                  {fuelErrors.liters && <span style={styles.errorText}>{fuelErrors.liters}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Total Cost ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 85.50"
                    value={fuelFormData.cost}
                    onChange={(e) => setFuelFormData({ ...fuelFormData, cost: e.target.value })}
                    style={{ ...styles.formInput, ...(fuelErrors.cost ? styles.inputError : {}) }}
                  />
                  {fuelErrors.cost && <span style={styles.errorText}>{fuelErrors.cost}</span>}
                </div>
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setIsFuelFormOpen(false);
                    setFuelErrors({});
                  }}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.saveBtn}>
                  Save Log
                </button>
              </div>
            </form>
          )}

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Vehicle</th>
                  <th style={styles.th}>Liters</th>
                  <th style={styles.th}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {fuelLogs.map((log, idx) => (
                  <tr key={idx} style={styles.tr}>
                    <td style={styles.td}>{log.date}</td>
                    <td style={{ ...styles.td, ...styles.monoCell }}>{log.vehicleRegistrationNumber}</td>
                    <td style={styles.td}>{log.liters.toLocaleString()} L</td>
                    <td style={{ ...styles.td, fontWeight: '600' }}>${log.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: OTHER EXPENSES / COSTS */}
        <section style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Other Expenses / Costs</h3>
            {!isExpenseFormOpen && (
              <button style={styles.addButton} onClick={() => setIsExpenseFormOpen(true)}>
                + Add Expense
              </button>
            )}
          </div>

          {isExpenseFormOpen && (
            <form onSubmit={handleExpenseSubmit} style={styles.inlineForm}>
              <h4 style={styles.formTitle}>Add Expense Record</h4>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Vehicle *</label>
                  <select
                    value={expenseFormData.vehicleRegistrationNumber}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, vehicleRegistrationNumber: e.target.value })}
                    style={{ ...styles.formInput, ...(expenseErrors.vehicleRegistrationNumber ? styles.inputError : {}) }}
                  >
                    <option value="">Select Vehicle</option>
                    {mockVehicles.map(v => (
                      <option key={v.registrationNumber} value={v.registrationNumber}>
                        {v.registrationNumber} - {v.name}
                      </option>
                    ))}
                  </select>
                  {expenseErrors.vehicleRegistrationNumber && <span style={styles.errorText}>{expenseErrors.vehicleRegistrationNumber}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Expense Type *</label>
                  <select
                    value={expenseFormData.type}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, type: e.target.value })}
                    style={{ ...styles.formInput, ...(expenseErrors.type ? styles.inputError : {}) }}
                  >
                    <option value="Toll">Toll</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Parking">Parking</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Other">Other</option>
                  </select>
                  {expenseErrors.type && <span style={styles.errorText}>{expenseErrors.type}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Date *</label>
                  <input
                    type="date"
                    value={expenseFormData.date}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, date: e.target.value })}
                    style={{ ...styles.formInput, ...(expenseErrors.date ? styles.inputError : {}) }}
                  />
                  {expenseErrors.date && <span style={styles.errorText}>{expenseErrors.date}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Amount ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 15.00"
                    value={expenseFormData.amount}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: e.target.value })}
                    style={{ ...styles.formInput, ...(expenseErrors.amount ? styles.inputError : {}) }}
                  />
                  {expenseErrors.amount && <span style={styles.errorText}>{expenseErrors.amount}</span>}
                </div>
              </div>

              <div style={{ ...styles.formGroup, marginTop: '12px' }}>
                <label style={styles.formLabel}>Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Toll fee for highway 101"
                  value={expenseFormData.notes}
                  onChange={(e) => setExpenseFormData({ ...expenseFormData, notes: e.target.value })}
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setIsExpenseFormOpen(false);
                    setExpenseErrors({});
                  }}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.saveBtn}>
                  Save Expense
                </button>
              </div>
            </form>
          )}

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Vehicle</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, idx) => (
                  <tr key={idx} style={styles.tr}>
                    <td style={styles.td}>{exp.date}</td>
                    <td style={{ ...styles.td, ...styles.monoCell }}>{exp.vehicleRegistrationNumber}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.expenseBadge, ...expenseBadgeStyles[exp.type] || expenseBadgeStyles.Other }}>
                        {exp.type}
                      </span>
                    </td>
                    <td style={{ ...styles.td, fontWeight: '600' }}>${exp.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td style={{ ...styles.td, color: '#666', fontSize: '13px' }}>{exp.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

const expenseBadgeStyles = {
  Toll: { backgroundColor: '#e8f0fe', color: '#1a73e8' },
  Maintenance: { backgroundColor: '#fce8e6', color: '#c5221f' },
  Parking: { backgroundColor: '#e6f4ea', color: '#137333' },
  Insurance: { backgroundColor: '#f1f3f4', color: '#3c4043' },
  Other: { backgroundColor: '#fef7e0', color: '#b06000' }
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
  summaryCard: {
    backgroundColor: '#1a73e8',
    color: '#fff',
    borderRadius: '12px',
    padding: '24px 32px',
    boxShadow: '0 4px 20px rgba(26, 115, 232, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '24px',
  },
  summaryInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  summaryLabel: {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    opacity: 0.9,
  },
  summaryValue: {
    fontSize: '36px',
    fontWeight: '800',
    margin: 0,
  },
  summaryDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  summaryDetailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  detailLabel: {
    fontSize: '12px',
    opacity: 0.8,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: '18px',
    fontWeight: '700',
  },
  summaryDetailItemDivider: {
    width: '1px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  sectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    padding: '24px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '12px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#222',
    margin: 0,
  },
  addButton: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#1a73e8',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  inlineForm: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid #e0e0e0',
  },
  formTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 16px 0',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  formLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#555',
  },
  formInput: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    outline: 'none',
  },
  inputError: {
    borderColor: '#d93025',
    backgroundColor: '#fce8e6',
  },
  errorText: {
    fontSize: '12px',
    color: '#d93025',
    marginTop: '2px',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '16px',
  },
  cancelBtn: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '500',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '500',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#1a73e8',
    color: '#fff',
    cursor: 'pointer',
  },
  tableWrapper: {
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
    padding: '12px 16px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#555',
    textTransform: 'uppercase',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#333',
    verticalAlign: 'middle',
  },
  monoCell: {
    fontFamily: 'monospace',
    fontWeight: '600',
    color: '#111',
  },
  expenseBadge: {
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  }
};
