import React, { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = 'success') => {
    switch (type) {
      case 'success':
        toast.success(message, {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
        break;
      case 'error':
        toast.error(message, {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#EF4444',
            color: '#fff',
          },
        });
        break;
      case 'loading':
        toast.loading(message, {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#3B82F6',
            color: '#fff',
          },
        });
        break;
      default:
        toast(message, {
          duration: 4000,
          position: 'top-right',
        });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}; 