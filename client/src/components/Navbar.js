// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

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
          
          {/* Combined Sign-Up Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-white hover:text-accent"
            >
              Sign Up
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                <Link
                  to="/customer-signup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => setShowDropdown(false)}
                >
                  Customer Sign Up
                </Link>
                <Link
                  to="/vendor-signup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => setShowDropdown(false)}
                >
                  Vendor Sign Up
                </Link>
              </div>
            )}
          </div>

          <Link to="/reviews" className="text-white hover:text-accent">Reviews</Link>
          <Link to="/cart" className="text-white hover:text-accent">Cart</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white">Menu</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
