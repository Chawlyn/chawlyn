import React, { useState } from 'react';
import axios from 'axios';

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    name: '',
    email: '',
    password: '',
    role: 'vendor', // Role to differentiate sign-up type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/register', formData); // Backend endpoint for registration
      alert('Vendor sign-up successful!');
      console.log(response.data);
      // Redirect to login or another page after successful sign-up
    } catch (error) {
      console.error('Vendor sign-up error:', error.response?.data || error.message);
      alert('Vendor sign-up failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Vendor Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Business Address</label>
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorSignup;
