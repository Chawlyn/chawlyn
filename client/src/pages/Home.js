// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Welcome to Chaw Republic!</h1>
      <p className="text-lg mb-8">Your go-to platform for food from multiple vendors in one place.</p>
      <div className="flex justify-center space-x-4">
        <Link to="/vendor-signup" className="bg-red-600 text-white p-3 rounded">
          Vendor Signup
        </Link>
        <Link to="/customer-signup" className="bg-green-600 text-white p-3 rounded">
          Customer Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
