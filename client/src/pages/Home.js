// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  return (
    
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Welcome to Chaw Republic!</h1>
      <p className="text-lg mb-8">Your go-to platform for food from multiple vendors in one place.</p>
      <div className="flex justify-center space-x-4">
        <Link to="/vendor-signup">
          <Button label="Vendor Signup" variant="primary" />
        </Link>
        <Link to="/customer-signup">
          <Button label="Customer Signup" variant="secondary" />
        </Link>
      </div>
      <div className="bg-blue-500 text-white p-4">Tailwind is Working!</div>

    </div>
  );
};

export default Home;
