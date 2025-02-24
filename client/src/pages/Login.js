import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('customer'); // Default role is customer

  // Extract role from query parameter (e.g., /login?role=vendor)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userRole = params.get('role') || 'customer';
    setRole(userRole);
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      // Determine correct API based on role
      const apiUrl =
        role === 'vendor'
          ? 'https://chaw-republic-backend.onrender.com/api/v1/vendor/login'
          : 'https://chaw-republic-backend.onrender.com/api/v1/customer/login';

      // Send login request to correct API
      const response = await axios.post(apiUrl, formData);

      const { token, user } = response.data.data;

      // Store auth token for session persistence
      localStorage.setItem('authToken', token);

      alert('Login successful! Redirecting to dashboard...');
      console.log('Logged in user:', user);

      // Redirect based on role
      if (role === 'vendor') {
        navigate('/vendor-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          {role === 'vendor' ? 'Vendor Login' : 'Customer Login'}
        </h1>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
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

          {/* Password Input */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full"
          >
            Login
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-2">
            <Link to={`/forgot-password?role=${role}`} className="text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
