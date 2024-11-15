// src/pages/Checkout.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  // Mock order details for display (in production, fetch from state or API)
  const orderDetails = {
    orderId: '12345',
    items: [
      { id: 1, name: 'Jollof Rice', price: 4500, quantity: 1 },
      { id: 2, name: 'Fried Plantains', price: 500, quantity: 2 },
      { id: 3, name: 'Extra Chicken', price: 750, quantity: 1 },
    ],
    total: 6250,
  };

  return (
    <div className="p-6 bg-background min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Checkout</h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Order Summary</h2>
        <div className="space-y-4">
          {orderDetails.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.quantity} x {item.name}</span>
              <span>₦{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₦{orderDetails.total.toFixed(2)}</span>
        </div>
      </div>
      <button className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full max-w-lg">
        Confirm and Pay
      </button>
    </div>
  );
};

export default Checkout;
