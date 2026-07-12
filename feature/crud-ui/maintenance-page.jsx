import React, { useState } from 'react';
import { mockMaintenanceRecords, mockVehicles } from './mockData';

// Wrap data sources at the top
export function getMaintenanceRecords() {
  return mockMaintenanceRecords;
}

// Placeholder function to close a maintenance record
export function closeMaintenanceRecord(id) {
  console.log(`[Placeholder] Closing maintenance record with ID: ${id}`);
}

export default function MaintenancePage() {
  const [records, setRecords] = useState(() => getMaintenanceRecords());
  const [formData, setFormData] = useState({
    vehicleRegistrationNumber: '',
    issueDescription: '',
    priority: 'Low',
    dateRaised: '2026-07-12'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCloseRecord = (id) => {
    // Call the external placeholder function
    closeMaintenanceRecord(id);
    // Mark Resolved in local state
    setRecords(prev => prev.map(rec => rec.id === id ? { ...rec, status: 'Resolved' } : rec));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.vehicleRegistrationNumber) newErrors.vehicleRegistrationNumber = 'Vehicle is required.';
    if (!formData.issueDescription.trim()) newErrors.issueDescription = 'Issue description is required.';
    if (!formData.dateRaised) newErrors.dateRaised = 'Date raised is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newRecord = {
      id: `m-${Date.now()}`,
      vehicleRegistrationNumber: formData.vehicleRegistrationNumber,
      issueDescription: formData.issueDescription.trim(),
      priority: formData.priority,
      status: 'Pending',
      dateRaised: formData.dateRaised
    };

    setRecords(prev => [newRecord, ...prev]);
    // Reset form
    setFormData({
      vehicleRegistrationNumber: '',
      issueDescription: '',
      priority: 'Low',
      dateRaised: '2026-07-12'
    });
    setErrors({});
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitleContainer}>
          <h1 style={styles.title}>Vehicle Maintenance</h1>
          <p style={styles.subtitle}>Report service issues and manage workshop workflow logs</p>
        </div>
      </header>

      {/* Two-panel Layout */}
      <div style={styles.panelContainer}>
        {/* LEFT PANEL: Log Service Record Form */}
        <section style={styles.leftPanel}>
          <h3 style={styles.panelTitle}>Log Service Record</h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Vehicle *</label>
              <select
                name="vehicleRegistrationNumber"
                value={formData.vehicleRegistrationNumber}
                onChange={handleChange}
                style={{ ...styles.select, ...(errors.vehicleRegistrationNumber ? styles.inputError : {}) }}
              >
                <option value="">Select Vehicle</option>
                {mockVehicles.map(v => (
                  <option key={v.registrationNumber} value={v.registrationNumber}>
                    {v.registrationNumber} - {v.name}
                  </option>
                ))}
              </select>
              {errors.vehicleRegistrationNumber && <span style={styles.errorText}>{errors.vehicleRegistrationNumber}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Issue Description *</label>
              <textarea
                name="issueDescription"
                rows="4"
                value={formData.issueDescription}
                onChange={handleChange}
                placeholder="Describe the vehicle issue..."
                style={{ ...styles.textarea, ...(errors.issueDescription ? styles.inputError : {}) }}
              />
              {errors.issueDescription && <span style={styles.errorText}>{errors.issueDescription}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Priority *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date Raised *</label>
              <input
                type="date"
                name="dateRaised"
                value={formData.dateRaised}
                onChange={handleChange}
                style={{ ...styles.input, ...(errors.dateRaised ? styles.inputError : {}) }}
              />
              {errors.dateRaised && <span style={styles.errorText}>{errors.dateRaised}</span>}
            </div>

            <button type="submit" style={styles.submitBtn}>
              Submit Record
            </button>
          </form>
        </section>

        {/* RIGHT PANEL: Maintenance Log Table */}
        <section style={styles.rightPanel}>
          <h3 style={styles.panelTitle}>Maintenance Log</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>Vehicle</th>
                  <th style={styles.th}>Issue Description</th>
                  <th style={styles.th}>Priority</th>
                  <th style={styles.th}>Date Raised</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id} style={styles.tr}>
                    <td style={{ ...styles.td, ...styles.monoCell }}>{rec.vehicleRegistrationNumber}</td>
                    <td style={{ ...styles.td, ...styles.issueCell }}>{rec.issueDescription}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...priorityBadgeStyles[rec.priority] }}>
                        {rec.priority}
                      </span>
                    </td>
                    <td style={styles.td}>{rec.dateRaised}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...statusBadgeStyles[rec.status] }}>
                        {rec.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {(rec.status === 'Pending' || rec.status === 'In Progress') ? (
                        <button
                          style={styles.closeBtn}
                          onClick={() => handleCloseRecord(rec.id)}
                        >
                          Close
                        </button>
                      ) : (
                        <span style={styles.closedLabel}>Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Bottom section: Workflow step indicator */}
      <section style={styles.workflowContainer}>
        <h4 style={styles.workflowTitle}>Maintenance Workflow Stages</h4>
        <div style={styles.workflowFlow}>
          <div style={styles.workflowStep}>
            <span style={{ ...styles.workflowBadge, ...statusBadgeStyles.Pending }}>Pending</span>
            <span style={styles.workflowDesc}>Logged & awaiting triage</span>
          </div>
          <div style={styles.workflowArrow}>➔</div>
          <div style={styles.workflowStep}>
            <span style={{ ...styles.workflowBadge, ...statusBadgeStyles['In Progress'] }}>In Progress</span>
            <span style={styles.workflowDesc}>Assigned to mechanics in shop</span>
          </div>
          <div style={styles.workflowArrow}>➔</div>
          <div style={styles.workflowStep}>
            <span style={{ ...styles.workflowBadge, ...statusBadgeStyles.Resolved }}>Resolved</span>
            <span style={styles.workflowDesc}>Repaired, tested & back in service</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const statusBadgeStyles = {
  Pending: {
    backgroundColor: 'var(--icon-bg-amber)',
    color: 'var(--icon-text-amber)',
  },
  'In Progress': {
    backgroundColor: 'var(--icon-bg-cyan)',
    color: 'var(--icon-text-cyan)',
  },
  Resolved: {
    backgroundColor: 'var(--icon-bg-emerald)',
    color: 'var(--icon-text-emerald)',
  }
};

const priorityBadgeStyles = {
  High: {
    backgroundColor: 'var(--icon-bg-rose)',
    color: 'var(--icon-text-rose)',
  },
  Medium: {
    backgroundColor: 'var(--icon-bg-amber)',
    color: 'var(--icon-text-amber)',
  },
  Low: {
    backgroundColor: 'var(--icon-bg-slate)',
    color: 'var(--text-secondary)',
  }
};

const styles = {
  container: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--surface-base)',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '32px',
  },
  headerTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  panelContainer: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    gap: '32px',
    marginBottom: '32px',
  },
  leftPanel: {
    backgroundColor: 'var(--surface-raised)',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    padding: '24px',
    height: 'fit-content',
  },
  rightPanel: {
    backgroundColor: 'var(--surface-raised)',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    padding: '24px',
  },
  panelTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: '0 0 20px 0',
    borderBottom: '1px solid var(--border-subtle)',
    paddingBottom: '12px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid var(--border-default)',
    outline: 'none',
  },
  select: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid var(--border-default)',
    backgroundColor: 'var(--surface-raised)',
    outline: 'none',
  },
  textarea: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid var(--border-default)',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  inputError: {
    borderColor: '#d93025',
    backgroundColor: 'var(--icon-bg-rose)',
  },
  errorText: {
    fontSize: '12px',
    color: 'var(--icon-text-rose)',
    marginTop: '2px',
  },
  submitBtn: {
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'var(--icon-text-emerald)',
    color: 'var(--surface-raised)',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.2s',
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
    backgroundColor: 'var(--surface-base)',
    borderBottom: '1px solid var(--border-subtle)',
  },
  th: {
    padding: '12px 16px',
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
  },
  tr: {
    borderBottom: '1px solid var(--border-subtle)',
  },
  td: {
    padding: '12px 16px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    verticalAlign: 'middle',
  },
  monoCell: {
    fontFamily: 'monospace',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  issueCell: {
    maxWidth: '250px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  badge: {
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
  closeBtn: {
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '4px',
    border: '1px solid var(--border-default)',
    backgroundColor: 'var(--surface-raised)',
    cursor: 'pointer',
    color: 'var(--icon-text-rose)',
    transition: 'background-color 0.2s',
  },
  closedLabel: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  workflowContainer: {
    backgroundColor: 'var(--surface-raised)',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  workflowTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    margin: '0 0 16px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  workflowFlow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  workflowStep: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: '150px',
  },
  workflowBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '700',
    display: 'inline-block',
    textAlign: 'center',
    width: 'fit-content',
  },
  workflowDesc: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  workflowArrow: {
    fontSize: '18px',
    color: '#aaa',
    userSelect: 'none',
  }
};
