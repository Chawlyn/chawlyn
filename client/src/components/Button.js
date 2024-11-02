// src/components/Button.js
import React from 'react';

const Button = ({ label, variant = "primary", onClick }) => {
  const baseClasses = "text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"; // Common styles
  const variantClasses = 
    variant === "primary" 
      ? "bg-primary hover:bg-secondary"    // Primary button style
      : "bg-secondary hover:bg-primary";   // Secondary button style

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {label}
    </button>
  );
};

export default Button;
