import React, { useState } from 'react';

export default function DriverForm({ onSave, onCancel, existingLicenseNumbers = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    licenseCategory: '',
    licenseExpiry: '',
    contactNumber: '',
    safetyScore: '',
    status: 'Available'
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

    // 1. Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // 2. License Number
    const licNum = formData.licenseNumber.trim();
    if (!licNum) {
      newErrors.licenseNumber = 'License Number is required.';
    } else {
      const licFormat = /^[A-Z0-9-]+$/i;
      if (!licFormat.test(licNum)) {
        newErrors.licenseNumber = 'Invalid format. Alphanumeric and hyphens only.';
      } else if (existingLicenseNumbers.some(num => num.toLowerCase() === licNum.toLowerCase())) {
        newErrors.licenseNumber = 'License Number must be unique.';
      }
    }

    // 3. License Category
    if (!formData.licenseCategory.trim()) {
      newErrors.licenseCategory = 'License Category is required.';
    }

    // 4. License Expiry
    const expiry = formData.licenseExpiry.trim();
    if (!expiry) {
      newErrors.licenseExpiry = 'License Expiry Date is required.';
    } else {
      // Expect YYYY-MM-DD
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(expiry)) {
        newErrors.licenseExpiry = 'Use YYYY-MM-DD format.';
      } else {
        const dateObj = new Date(expiry);
        if (isNaN(dateObj.getTime())) {
          newErrors.licenseExpiry = 'Invalid Date.';
        }
      }
    }

    // 5. Contact Number
    const contact = formData.contactNumber.trim();
    if (!contact) {
      newErrors.contactNumber = 'Contact Number is required.';
    } else {
      // Basic phone format (allowing +, spaces, hyphens, numbers)
      const phoneRegex = /^\+?[0-9\s.-]{7,20}$/;
      if (!phoneRegex.test(contact)) {
        newErrors.contactNumber = 'Invalid format. Use numbers, spaces, hyphens or + (min 7 digits).';
      }
    }

    // 6. Safety Score
    const scoreVal = formData.safetyScore;
    if (scoreVal === '' || isNaN(Number(scoreVal)) || Number(scoreVal) < 0 || Number(scoreVal) > 100) {
      newErrors.safetyScore = 'Safety Score must be a number between 0 and 100.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        name: formData.name.trim(),
        licenseNumber: formData.licenseNumber.trim().toUpperCase(),
        licenseCategory: formData.licenseCategory.trim(),
        licenseExpiry: formData.licenseExpiry.trim(),
        contactNumber: formData.contactNumber.trim(),
        safetyScore: Number(formData.safetyScore),
        status: formData.status
      });
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Add New Driver</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
          />
          {errors.name && <span style={styles.errorText}>{errors.name}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>License Number *</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            placeholder="e.g. DL-998811"
            style={{ ...styles.input, ...(errors.licenseNumber ? styles.inputError : {}) }}
          />
          {errors.licenseNumber && <span style={styles.errorText}>{errors.licenseNumber}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>License Category *</label>
          <input
            type="text"
            name="licenseCategory"
            value={formData.licenseCategory}
            onChange={handleChange}
            placeholder="e.g. Class A CDL"
            style={{ ...styles.input, ...(errors.licenseCategory ? styles.inputError : {}) }}
          />
          {errors.licenseCategory && <span style={styles.errorText}>{errors.licenseCategory}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>License Expiry Date (YYYY-MM-DD) *</label>
          <input
            type="text"
            name="licenseExpiry"
            value={formData.licenseExpiry}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
            style={{ ...styles.input, ...(errors.licenseExpiry ? styles.inputError : {}) }}
          />
          {errors.licenseExpiry && <span style={styles.errorText}>{errors.licenseExpiry}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Number *</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="e.g. +1-555-0199"
            style={{ ...styles.input, ...(errors.contactNumber ? styles.inputError : {}) }}
          />
          {errors.contactNumber && <span style={styles.errorText}>{errors.contactNumber}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Safety Score (0-100) *</label>
          <input
            type="number"
            name="safetyScore"
            value={formData.safetyScore}
            onChange={handleChange}
            placeholder="e.g. 95"
            style={{ ...styles.input, ...(errors.safetyScore ? styles.inputError : {}) }}
          />
          {errors.safetyScore && <span style={styles.errorText}>{errors.safetyScore}</span>}
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
            <option value="Off Duty">Off Duty</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <div style={styles.actions}>
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" style={styles.submitBtn}>
            Save Driver
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
