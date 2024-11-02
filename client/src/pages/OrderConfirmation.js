// src/pages/OrderConfirmation.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  // Example data (in production, this should be passed from the checkout or backend)
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || {
    orderId: '12345',
    estimatedDelivery: '45 minutes',
    items: [
      { id: 1, name: 'Jollof Rice', price: 4500, quantity: 1 },
      { id: 2, name: 'Fried Plantains', price: 500, quantity: 2 },
      { id: 3, name: 'Extra Chicken', price: 750, quantity: 1 },
    ],
    total: 6250,
  };

  return (
    <div className="p-6 bg-background min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Order Confirmed!</h1>
      <p className="text-lg text-gray-700 mb-4 text-center">
        Thank you for your order! Your order ID is <span className="font-semibold">{orderDetails.orderId}</span>.
      </p>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Estimated delivery time: <span className="font-semibold">{orderDetails.estimatedDelivery}</span>
      </p>

      {/* Order Summary */}
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

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link to="/" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition text-center w-full md:w-auto">
          Back to Home
        </Link>
        <Link to="/order-tracking" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition text-center w-full md:w-auto">
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
