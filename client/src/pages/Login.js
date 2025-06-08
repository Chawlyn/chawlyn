import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Form, { FormField, FormButton } from '../components/Form';
import { required, email, password } from '../utils/validation';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = {
    email: [required, email],
    password: [required, password],
  };

  const handleSubmit = async (values) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Login values:', values);
    // Navigate to dashboard on success
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nigerianPurple to-nigerianOrange flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <Form
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{ email: '', password: '' }}
          >
            <FormField
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              autoComplete="email"
            />

            <FormField
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-nigerianOrange focus:ring-nigerianOrange border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-nigerianOrange hover:text-nigerianPurple"
              >
                Forgot password?
              </Link>
            </div>

            <FormButton type="submit">Sign In</FormButton>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-nigerianOrange hover:text-nigerianPurple"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
