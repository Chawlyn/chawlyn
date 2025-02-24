import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://chaw-republic-backend.onrender.com/api/v1/customer/reset/${token}`,
        { password }
      );
      console.log('Password Reset:', response.data); // ✅ Logging response
      setMessage('Password has been reset successfully.');
      navigate('/login'); // Redirect to login
    } catch (error) {
      console.error('Reset Password error:', error.response?.data || error.message);
      setMessage('Failed to reset password.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Reset Password</h1>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-center mt-3 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
