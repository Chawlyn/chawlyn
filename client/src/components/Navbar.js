// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Link */}
        <Link to="/" className="text-white text-2xl font-bold">
          Chaw Republic
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/explore" className="text-white hover:text-accent">Explore</Link>
          <Link to="/vendor-signup" className="text-white hover:text-accent">Vendor Signup</Link>
          <Link to="/customer-signup" className="text-white hover:text-accent">Customer Signup</Link>
          <Link to="/cart" className="text-white hover:text-accent">Cart</Link> {/* Cart Link */}
        </div>

        {/* Mobile Menu Button (for smaller screens) */}
        <div className="md:hidden">
          <button className="text-white">Menu</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
