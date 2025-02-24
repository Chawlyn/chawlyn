import React, { useState } from 'react';
import axios from 'axios';

const ResendOTP = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        `https://chaw-republic-backend.onrender.com/api/v1/customer/otp/${userId}`
      );
      console.log('OTP Resent:', response.data); // ✅ Logging response to avoid ESLint warning
      setMessage('OTP has been resent successfully.');
    } catch (error) {
      console.error('Resend OTP error:', error.response?.data || error.message);
      setMessage('Failed to resend OTP.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Resend OTP</h1>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          onClick={handleResendOTP}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full mt-4"
        >
          Resend OTP
        </button>
        {message && <p className="text-center mt-3 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ResendOTP;
