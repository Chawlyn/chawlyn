// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Chaw Republic
        </Link>
        <div>
          <Link to="/vendor-signup" className="text-white mx-2">Vendor Signup</Link>
          <Link to="/customer-signup" className="text-white mx-2">Customer Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
