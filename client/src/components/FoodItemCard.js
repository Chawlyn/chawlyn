import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FoodItemCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/items/${item.id}`}>
        <div className="relative">
          {/* Image Container */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-100">
            {!imageError ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-48 bg-gradient-primary flex items-center justify-center">
                <span className="text-white text-4xl">🍽️</span>
              </div>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button className="bg-nigerianOrange text-white px-4 py-2 rounded-full transform hover:scale-105 transition-transform duration-200">
              View Details
            </button>
          </div>

          {/* Vendor Badge */}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-700">
            {item.vendor}
          </div>

          {/* Price Badge */}
          <div className="absolute top-2 right-2 bg-nigerianGreen text-white px-3 py-1 rounded-full text-sm font-bold">
            {formatCurrency(item.price)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {item.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.floor(item.rating)
                        ? 'text-nigerianYellow'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                ({item.reviewCount} reviews)
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {item.preparationTime} mins
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FoodItemCard; 