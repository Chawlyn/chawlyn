import React from 'react';

const ErrorState = ({ 
  title = 'Something went wrong',
  message = 'We encountered an error while processing your request.',
  action,
  variant = 'default'
}) => {
  const variants = {
    default: {
      icon: (
        <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    empty: {
      icon: (
        <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700'
    },
    offline: {
      icon: (
        <svg className="w-16 h-16 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <div className={`${selectedVariant.bgColor} rounded-lg p-8 text-center animate-fade-in`}>
      <div className="flex justify-center mb-4">
        {selectedVariant.icon}
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${selectedVariant.textColor}`}>
        {title}
      </h3>
      <p className={`mb-6 ${selectedVariant.textColor}`}>
        {message}
      </p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
};

export const EmptyState = ({ title, message, action }) => (
  <ErrorState
    variant="empty"
    title={title || 'No items found'}
    message={message || 'There are no items to display at the moment.'}
    action={action}
  />
);

export const OfflineState = ({ title, message, action }) => (
  <ErrorState
    variant="offline"
    title={title || 'You are offline'}
    message={message || 'Please check your internet connection and try again.'}
    action={action}
  />
);

export default ErrorState; 