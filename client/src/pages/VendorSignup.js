import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorSignup = () => {
  const navigate = useNavigate(); // For redirection after signup

  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before sending request
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please check and try again.');
      return;
    }

    // Create a new object without confirmPassword before sending to backend
    const { confirmPassword, ...dataToSend } = formData;

    try {
      // API request to backend
      const response = await axios.post(
        'https://chaw-republic-backend.onrender.com/api/v1/vendor/register',
        dataToSend // Send data without confirmPassword
      );

      console.log('Server Response:', response.data);
      // Redirect to Vendor Dashboard after successful signup
      navigate('/vendor-dashboard');
    } catch (error) {
      console.error('Vendor sign-up error:', error.response?.data || error.message);
      alert('Vendor sign-up failed. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background py-12 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Vendor Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Name Field */}
          <div>
            <label className="block text-gray-700">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your business name"
              required
            />
          </div>

          {/* Business Address Field */}
          <div>
            <label className="block text-gray-700">Business Address</label>
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your business address"
              required
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Re-enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2 text-gray-600"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorSignup;
