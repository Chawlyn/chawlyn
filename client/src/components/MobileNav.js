import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileNav = ({ isAuthenticated, userRole, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Menu</span>
              <button
                onClick={closeMenu}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <Link
              to="/explore"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart
                </Link>
                <Link
                  to={userRole === 'vendor' ? '/vendor-dashboard' : '/customer-dashboard'}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    closeMenu();
                  }}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="px-4 py-2 text-sm font-medium text-gray-500">
                  Sign Up
                </div>
                <Link
                  to="/customer-signup"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  As Customer
                </Link>
                <Link
                  to="/vendor-signup"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  As Vendor
                </Link>

                <div className="px-4 py-2 mt-4">
                  <Link
                    to="/login"
                    className="block w-full bg-nigerianYellow text-nigerianBrown text-center px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav; 