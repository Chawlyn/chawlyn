// src/pages/CustomerProfile.js
import React from 'react';
import { Link } from 'react-router-dom';

const CustomerProfile = () => {
  // Example data (in production, this data should come from an API or context)
  const customer = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+234 123 456 7890',
    addresses: [
      { id: 1, label: 'Home', details: '123 Foodie Lane, Port Harcourt' },
      { id: 2, label: 'Work', details: '456 Office Park, Port Harcourt' },
    ],
    paymentMethods: [
      { id: 1, type: 'Credit Card', last4: '1234', expiry: '09/24' },
      { id: 2, type: 'PayPal', email: 'johndoe@paypal.com' },
    ],
    orderHistory: [
      { id: 101, date: '2023-08-15', total: 7500, items: ['Jollof Rice', 'Fried Plantains'] },
      { id: 102, date: '2023-07-30', total: 5000, items: ['Egusi Soup', 'Pounded Yam'] },
    ],
  };

  return (
    <div className="p-6 bg-background min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">My Profile</h1>

      {/* Personal Details */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Personal Details</h2>
        <p><span className="font-semibold">Name:</span> {customer.name}</p>
        <p><span className="font-semibold">Email:</span> {customer.email}</p>
        <p><span className="font-semibold">Phone:</span> {customer.phone}</p>
      </div>

      {/* Saved Addresses */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Saved Addresses</h2>
        {customer.addresses.map((address) => (
          <div key={address.id} className="border-b py-2">
            <p className="font-semibold">{address.label}</p>
            <p>{address.details}</p>
          </div>
        ))}
        <button className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition">
          Add New Address
        </button>
      </div>

      {/* Payment Methods */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Payment Options</h2>
        {customer.paymentMethods.map((method) => (
          <div key={method.id} className="border-b py-2">
            <p className="font-semibold">{method.type}</p>
            {method.type === 'Credit Card' ? (
              <p>**** **** **** {method.last4} (Exp: {method.expiry})</p>
            ) : (
              <p>{method.email}</p>
            )}
          </div>
        ))}
        <button className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition">
          Add New Payment Method
        </button>
      </div>

      {/* Order History */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Order History</h2>
        {customer.orderHistory.map((order) => (
          <div key={order.id} className="border-b py-4">
            <p className="font-semibold">Order ID: {order.id}</p>
            <p>Date: {order.date}</p>
            <p>Total: ₦{order.total.toFixed(2)}</p>
            <p>Items: {order.items.join(', ')}</p>
            <div className="flex space-x-2 mt-2">
              <Link
                to={`/order/${order.id}`}
                className="text-blue-500 hover:underline"
              >
                View Order
              </Link>
              <button className="text-primary hover:underline">
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProfile;
