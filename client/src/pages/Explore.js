// src/pages/Explore.js
import React from 'react';
import { Link } from 'react-router-dom';

const Explore = () => {
  // Example categories (these can be replaced by API data)
  const categories = [
    { id: 1, name: 'Fast Food', image: '/images/fast-food.jpg' },
    { id: 2, name: 'Healthy Options', image: '/images/healthy.jpg' },
    { id: 3, name: 'Local Cuisine', image: '/images/local.jpg' },
    { id: 4, name: 'Desserts', image: '/images/desserts.jpg' },
  ];

  // Example trending items (these can also be replaced by API data)
  const trendingItems = [
    { id: 1, name: 'Burger Supreme', category: 'Fast Food', rating: 4.9 },
    { id: 2, name: 'Quinoa Salad', category: 'Healthy Options', rating: 4.7 },
    { id: 3, name: 'Jollof Rice', category: 'Local Cuisine', rating: 4.8 },
    { id: 4, name: 'Chocolate Cake', category: 'Desserts', rating: 4.6 },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-primary text-center mb-8">Explore Categories & Trending Items</h1>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Categories</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="block bg-white rounded-lg shadow hover:shadow-md transition duration-200"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-secondary">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Items Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Trending & Popular Items</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trendingItems.map((item) => (
            <Link
              to={`/items/${item.id}`}
              key={item.id}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200"
            >
              <h3 className="text-lg font-bold text-secondary">{item.name}</h3>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-yellow-500 font-semibold">Rating: {item.rating}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
