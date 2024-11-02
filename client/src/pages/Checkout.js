// src/pages/Checkout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Perform any necessary checkout actions here (e.g., processing payment)

    // After checkout is complete, navigate to Order Confirmation
    navigate('/order-confirmation', {
      state: {
        orderDetails: {
          orderId: '12345', // Example order ID
          estimatedDelivery: '45 minutes',
          items: [
            { id: 1, name: 'Jollof Rice', price: 4500, quantity: 1 },
            { id: 2, name: 'Fried Plantains', price: 500, quantity: 2 },
            { id: 3, name: 'Extra Chicken', price: 750, quantity: 1 },
          ],
          total: 6250, // Example total cost
        },
      },
    });
  };

  return (
    <div className="p-6 bg-background min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Checkout</h1>
      <p className="text-lg text-gray-700 mb-4">Review your order and complete the checkout process.</p>
      
      {/* Other checkout details here */}

      <button
        onClick={handleCheckout}
        className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition"
      >
        Complete Checkout
      </button>
    </div>
  );
};

export default Checkout;
