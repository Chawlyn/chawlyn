export const required = (value) => {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }
  return '';
};

export const email = (value) => {
  if (!value) return '';
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const minLength = (min) => (value) => {
  if (!value) return '';
  if (value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return '';
};

export const maxLength = (max) => (value) => {
  if (!value) return '';
  if (value.length > max) {
    return `Must be at most ${max} characters`;
  }
  return '';
};

export const phoneNumber = (value) => {
  if (!value) return '';
  const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
  if (!phoneRegex.test(value)) {
    return 'Please enter a valid Nigerian phone number';
  }
  return '';
};

export const password = (value) => {
  if (!value) return '';
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(value)) {
    return 'Password must contain at least one number';
  }
  if (!/[!@#$%^&*]/.test(value)) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }
  return '';
};

export const confirmPassword = (password) => (value) => {
  if (!value) return '';
  if (value !== password) {
    return 'Passwords do not match';
  }
  return '';
};

export const price = (value) => {
  if (!value) return '';
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return 'Please enter a valid price';
  }
  return '';
};

export const rating = (value) => {
  if (!value) return '';
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 5) {
    return 'Rating must be between 1 and 5';
  }
  return '';
};

export const createValidationSchema = (schema) => {
  return Object.entries(schema).reduce((acc, [field, rules]) => {
    acc[field] = Array.isArray(rules) ? rules : [rules];
    return acc;
  }, {});
}; 