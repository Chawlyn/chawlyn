// src/pages/Home.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useToast } from '../context/ToastContext';

const Home = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('Port Harcourt');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    'Woji',
    'Mile 1',
    'Mile 2',
    'Mile 3',
    'Mile 4',
    'Rumuokwuta',
    'Rumuokwurusi',
    'Rumuodara',
    'Rumuigbo',
    'Rumuibekwe',
    'Rumueme'
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?search=${searchQuery}&location=${selectedLocation}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center py-12 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Delicious Food</span>
            <span className="block text-nigerianOrange">Delivered to Your Door</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Order from your favorite local restaurants and get it delivered right to your doorstep.
          </p>

          {/* Location Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              {/* Location Dropdown */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left text-gray-700 hover:border-nigerianOrange focus:outline-none focus:ring-2 focus:ring-nigerianOrange focus:border-transparent"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{selectedLocation}</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showLocationDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {locations.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handleLocationSelect(area)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-nigerianOrange focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-nigerianOrange"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/explore"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-nigerianOrange hover:bg-nigerianBrown md:py-4 md:text-lg md:px-10"
              >
                Order Now
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/vendor-signup"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-nigerianOrange bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Become a Vendor
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="py-12 bg-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-nigerianOrange font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to order food
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: 'Fast Delivery',
                    description: 'Get your food delivered in minutes with our efficient delivery system.',
                    icon: '🚚',
                  },
                  {
                    title: 'Fresh Food',
                    description: 'Enjoy fresh and delicious food from local restaurants.',
                    icon: '🍽️',
                  },
                  {
                    title: 'Easy Ordering',
                    description: 'Order with just a few clicks and track your delivery in real-time.',
                    icon: '📱',
                  },
                  {
                    title: 'Secure Payments',
                    description: 'Pay securely with multiple payment options.',
                    icon: '💳',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-nigerianOrange text-white text-2xl">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                        <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-nigerianPurple"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-nigerianOrange">Join us today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/customer-signup"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-nigerianPurple bg-white hover:bg-gray-50"
                >
                  Get started
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-nigerianOrange hover:bg-nigerianBrown"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Home;
