import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileNav = ({ isOpen, onClose }) => {
  const { getCartCount } = useCart();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Port Harcourt');

  // Port Harcourt areas
  const locations = [
    'Port Harcourt',
    'GRA',
    'Rumuokoro',
    'Rumuola',
    'Rumuomasi',
    'Trans-Amadi',
    'D/Line',
    'Borokiri',
    'Abuloma',
    'Woji'
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Mobile Menu */}
      <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Location Selector */}
          <div className="px-4 py-3 border-b">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center space-x-2 text-gray-700 hover:text-nigerianOrange transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{selectedLocation}</span>
            </button>
            {showLocationDropdown && (
              <div className="mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
                {locations.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleLocationSelect(area)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <Link
              to="/explore"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore
            </Link>

            <Link
              to="/cart"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              <div className="relative">
                <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-nigerianOrange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </div>
              Cart
            </Link>

            <Link
              to="/customer-signup"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Sign Up
            </Link>

            <Link
              to="/vendor-signup"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Become a Vendor
            </Link>

            <Link
              to="/login"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </Link>

            <Link
              to="/customer-dashboard"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-nigerianOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav; 