// src/components/Button.js
import React from 'react';

const Button = ({ label, variant = "primary", onClick, isLoading = false, disabled = false }) => {
  const baseClasses = "text-white py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center";
  const variantClasses = 
    variant === "primary" 
      ? "bg-primary hover:bg-secondary disabled:bg-gray-400"    
      : "bg-secondary hover:bg-primary disabled:bg-gray-400";   

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variantClasses}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
