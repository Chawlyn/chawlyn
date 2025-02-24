import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userId') setUserId(value);
    if (name === 'otp') setOtp(value);
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        `https://chaw-republic-backend.onrender.com/api/v1/customer/otp/${userId}`,
        { otp }
      );
      console.log('OTP Verified:', response.data); // ✅ Logging response
      setMessage('OTP verified successfully.');
      navigate('/login'); // Redirect after verification
    } catch (error) {
      console.error('Verify OTP error:', error.response?.data || error.message);
      setMessage('Failed to verify OTP.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Verify OTP</h1>
        <input
          type="text"
          name="userId"
          placeholder="Enter User ID"
          value={userId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
          required
        />
        <button
          onClick={handleVerifyOTP}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full mt-4"
        >
          Verify OTP
        </button>
        {message && <p className="text-center mt-3 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyOTP;
