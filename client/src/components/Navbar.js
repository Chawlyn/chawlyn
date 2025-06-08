import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileNav from './MobileNav';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Port Harcourt');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

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

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    navigate(`/explore?search=${searchQuery}`);
  };

  return (
    <nav className="bg-gradient-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col py-4">
          {/* Top Bar - Logo and Auth */}
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-white text-2xl font-bold">Chaw Republic</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/explore" 
                className="text-white hover:text-accent transition-colors duration-200"
                aria-label="Explore food items"
              >
                Explore
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/cart" 
                    className="text-white hover:text-nigerianYellow transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Cart
                  </Link>
                  <Link 
                    to={userRole === 'vendor' ? '/vendor-dashboard' : '/customer-dashboard'}
                    className="text-white hover:text-nigerianYellow transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-nigerianYellow transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <button className="text-white hover:text-nigerianYellow transition-colors duration-200">
                      Sign Up
                    </button>
                    <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        to="/customer-signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        As Customer
                      </Link>
                      <Link
                        to="/vendor-signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        As Vendor
                      </Link>
                    </div>
                  </div>
                  <Link
                    to="/login"
                    className="bg-nigerianYellow text-nigerianBrown px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
              <MobileNav isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
            </div>
          </div>

          {/* Search and Location Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md w-full md:w-48"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">{selectedLocation}</span>
              </button>
              
              {showLocationDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food, restaurants, or cuisines..."
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerianYellow"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-nigerianBrown"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
