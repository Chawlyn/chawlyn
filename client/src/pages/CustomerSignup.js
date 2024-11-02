// src/pages/CustomerSignup.js
import React, { useState } from 'react';
import Button from '../components/Button';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer Signup Data:', formData);
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">Customer Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full p-3 border border-textPrimary rounded focus:outline-none focus:ring focus:ring-primary"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border border-textPrimary rounded focus:outline-none focus:ring focus:ring-primary"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 border border-textPrimary rounded focus:outline-none focus:ring focus:ring-primary"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-3 border border-textPrimary rounded focus:outline-none focus:ring focus:ring-primary"
        />

        {/* Use Button Component */}
        <Button label="Sign Up" variant="primary" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default CustomerSignup;
