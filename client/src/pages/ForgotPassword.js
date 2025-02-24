import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract role from query parameter (e.g., /forgot-password?role=vendor)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userRole = params.get('role') || 'customer';
    setRole(userRole);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const apiEndpoint =
      role === 'vendor'
        ? 'https://chaw-republic-backend.onrender.com/api/v1/vendor/forget-password'
        : 'https://chaw-republic-backend.onrender.com/api/v1/customer/forget-password';

    try {
      const response = await axios.post(apiEndpoint, { email });
      setMessage('Password reset link sent! Check your email.');
    } catch (error) {
      setMessage('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          {role === 'vendor' ? 'Vendor' : 'Customer'} Password Reset
        </h1>

        {message && <p className="text-center text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Enter Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your registered email"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
