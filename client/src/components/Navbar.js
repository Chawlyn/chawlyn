import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null); // Tracks the dropdown being hovered

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownSelect = (path) => {
    navigate(path);
    setHoveredDropdown(null); // Close dropdown after navigation
  };

  return (
    <nav className="bg-primary p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Chaw Republic
        </Link>

        {/* Menu Button for Mobile */}
        <button
          className="text-white md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✖' : '☰'} {/* Toggle icon */}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/explore" className="text-white hover:text-accent">
            Explore
          </Link>
          <Link to="/cart" className="text-white hover:text-accent">
            Cart
          </Link>

          {/* Sign Up Dropdown */}
          <div
            className="relative text-white hover:text-accent cursor-pointer"
            onMouseEnter={() => setHoveredDropdown('signUp')}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <span>Sign Up</span>
            {(hoveredDropdown === 'signUp') && (
              <div className="absolute bg-white text-gray-800 mt-2 rounded shadow-lg w-40">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDropdownSelect('/customer-signup')}
                >
                  As Customer
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDropdownSelect('/vendor-signup')}
                >
                  As Vendor
                </div>
              </div>
            )}
          </div>

          {/* Login Dropdown */}
          <div
            className="relative text-white hover:text-accent cursor-pointer"
            onMouseEnter={() => setHoveredDropdown('login')}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <span>Login</span>
            {(hoveredDropdown === 'login') && (
              <div className="absolute bg-white text-gray-800 mt-2 rounded shadow-lg w-40">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDropdownSelect('/login?role=customer')}
                >
                  As Customer
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDropdownSelect('/login?role=vendor')}
                >
                  As Vendor
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary text-white mt-2 p-4 space-y-2">
          <Link to="/explore" className="block hover:text-accent" onClick={toggleMenu}>
            Explore
          </Link>
          <Link to="/cart" className="block hover:text-accent" onClick={toggleMenu}>
            Cart
          </Link>
          {/* Mobile Sign Up Dropdown */}
          <div className="block">
            <span>Sign Up</span>
            <div className="space-y-2 ml-4 mt-2">
              <div
                className="hover:text-accent cursor-pointer"
                onClick={() => handleDropdownSelect('/customer-signup')}
              >
                As Customer
              </div>
              <div
                className="hover:text-accent cursor-pointer"
                onClick={() => handleDropdownSelect('/vendor-signup')}
              >
                As Vendor
              </div>
            </div>
          </div>
          {/* Mobile Login Dropdown */}
          <div className="block">
            <span>Login</span>
            <div className="space-y-2 ml-4 mt-2">
              <div
                className="hover:text-accent cursor-pointer"
                onClick={() => handleDropdownSelect('/login?role=customer')}
              >
                As Customer
              </div>
              <div
                className="hover:text-accent cursor-pointer"
                onClick={() => handleDropdownSelect('/login?role=vendor')}
              >
                As Vendor
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
