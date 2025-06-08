import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Form = ({
  onSubmit,
  initialValues = {},
  validationSchema = {},
  children,
  className = '',
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    if (!validationSchema[name]) return '';

    const rules = validationSchema[name];
    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(validationSchema).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationSchema).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const { name } = child.props;
        if (!name) return child;

        return React.cloneElement(child, {
          value: values[name] || '',
          onChange: handleChange,
          onBlur: handleBlur,
          error: errors[name],
          touched: touched[name],
          isSubmitting,
        });
      })}
    </form>
  );
};

export const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  isSubmitting,
  className = '',
  ...props
}) => {
  const inputClasses = `
    w-full px-4 py-2 rounded-lg border transition-colors duration-200
    ${error && touched ? 'border-red-500' : 'border-gray-300'}
    focus:outline-none focus:ring-2 focus:ring-nigerianOrange focus:border-transparent
    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
  `;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={isSubmitting}
          className={inputClasses}
          {...props}
        />
        <AnimatePresence>
          {error && touched && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-0 mt-2 mr-2"
            >
              <div className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const FormButton = ({
  type = 'submit',
  children,
  isLoading,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`
        w-full bg-nigerianOrange text-white py-2 px-4 rounded-lg
        transform transition-all duration-200
        hover:bg-opacity-90 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-nigerianOrange focus:ring-opacity-50
        disabled:opacity-75 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Form; 