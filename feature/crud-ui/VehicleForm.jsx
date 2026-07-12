import React, { useState } from 'react';

export default function VehicleForm({ onSave, onCancel, existingRegNumbers = [] }) {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    name: '',
    type: '',
    maxLoadCapacity: '',
    odometer: '',
    acquisitionCost: '',
    status: 'Available',
    region: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field if user started typing/changing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    // 1. Registration Number
    const regNum = formData.registrationNumber.trim();
    if (!regNum) {
      newErrors.registrationNumber = 'Registration Number is required.';
    } else {
      // Registration Number format (alphanumeric and hyphens, min length 3)
      const regFormat = /^[A-Z0-9-]+$/i;
      if (!regFormat.test(regNum)) {
        newErrors.registrationNumber = 'Invalid format. Only alphanumeric characters and hyphens are allowed.';
      } else if (existingRegNumbers.some(num => num.toLowerCase() === regNum.toLowerCase())) {
        newErrors.registrationNumber = 'Registration Number must be unique.';
      }
    }

    // 2. Name/Model
    if (!formData.name.trim()) {
      newErrors.name = 'Name/Model is required.';
    }

    // 3. Type
    if (!formData.type.trim()) {
      newErrors.type = 'Vehicle Type is required.';
    }

    // 4. Max Load Capacity
    if (formData.maxLoadCapacity === '' || isNaN(Number(formData.maxLoadCapacity)) || Number(formData.maxLoadCapacity) < 0) {
      newErrors.maxLoadCapacity = 'Please enter a valid non-negative number.';
    }

    // 5. Odometer
    if (formData.odometer === '' || isNaN(Number(formData.odometer)) || Number(formData.odometer) < 0) {
      newErrors.odometer = 'Please enter a valid non-negative number.';
    }

    // 6. Acquisition Cost
    if (formData.acquisitionCost === '' || isNaN(Number(formData.acquisitionCost)) || Number(formData.acquisitionCost) < 0) {
      newErrors.acquisitionCost = 'Please enter a valid non-negative number.';
    }

    // 7. Region
    if (!formData.region.trim()) {
      newErrors.region = 'Region is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        registrationNumber: formData.registrationNumber.trim().toUpperCase(),
        name: formData.name.trim(),
        type: formData.type.trim(),
        maxLoadCapacity: Number(formData.maxLoadCapacity),
        odometer: Number(formData.odometer),
        acquisitionCost: Number(formData.acquisitionCost),
        status: formData.status,
        region: formData.region.trim()
      });
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Add New Vehicle</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Registration Number *</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="e.g. TX-9988-A"
            style={{ ...styles.input, ...(errors.registrationNumber ? styles.inputError : {}) }}
          />
          {errors.registrationNumber && <span style={styles.errorText}>{errors.registrationNumber}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Name/Model *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ford Transit Cargo 250"
            style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
          />
          {errors.name && <span style={styles.errorText}>{errors.name}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Vehicle Type *</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="e.g. Cargo Van"
            style={{ ...styles.input, ...(errors.type ? styles.inputError : {}) }}
          />
          {errors.type && <span style={styles.errorText}>{errors.type}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Max Load Capacity (kg) *</label>
          <input
            type="number"
            name="maxLoadCapacity"
            value={formData.maxLoadCapacity}
            onChange={handleChange}
            placeholder="e.g. 1500"
            style={{ ...styles.input, ...(errors.maxLoadCapacity ? styles.inputError : {}) }}
          />
          {errors.maxLoadCapacity && <span style={styles.errorText}>{errors.maxLoadCapacity}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Odometer (km) *</label>
          <input
            type="number"
            name="odometer"
            value={formData.odometer}
            onChange={handleChange}
            placeholder="e.g. 45000"
            style={{ ...styles.input, ...(errors.odometer ? styles.inputError : {}) }}
          />
          {errors.odometer && <span style={styles.errorText}>{errors.odometer}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Acquisition Cost ($) *</label>
          <input
            type="number"
            name="acquisitionCost"
            value={formData.acquisitionCost}
            onChange={handleChange}
            placeholder="e.g. 35000"
            style={{ ...styles.input, ...(errors.acquisitionCost ? styles.inputError : {}) }}
          />
          {errors.acquisitionCost && <span style={styles.errorText}>{errors.acquisitionCost}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Region *</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="e.g. North"
            style={{ ...styles.input, ...(errors.region ? styles.inputError : {}) }}
          />
          {errors.region && <span style={styles.errorText}>{errors.region}</span>}
        </div>

        <div style={styles.actions}>
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" style={styles.submitBtn}>
            Save Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
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
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputError: {
    borderColor: '#d93025',
    backgroundColor: '#fce8e6',
  },
  select: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    outline: 'none',
  },
  errorText: {
    fontSize: '12px',
    color: '#d93025',
    marginTop: '2px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '10px',
  },
  cancelBtn: {
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    color: '#333',
    transition: 'background-color 0.2s',
  },
  submitBtn: {
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#1a73e8',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }
};
