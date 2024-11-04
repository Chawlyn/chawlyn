// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample data for categories and trending items (replace with API data in production)
  const categories = [
    { id: 1, name: 'Fast Food' },
    { id: 2, name: 'Healthy Options' },
    { id: 3, name: 'Local Cuisine' },
    { id: 4, name: 'Desserts' },
  ];

  const trendingItems = [
    { id: 1, name: 'Burger Supreme', category: 'Fast Food', rating: 4.9 },
    { id: 2, name: 'Quinoa Salad', category: 'Healthy Options', rating: 4.7 },
    { id: 3, name: 'Jollof Rice', category: 'Local Cuisine', rating: 4.8 },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-primary text-center mb-8">Welcome to Chaw Republic!</h1>

      {/* Explore Button */}
      <div className="text-center mb-8">
        <Link to="/explore" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition">
          Discover More in Explore
        </Link>
      </div>

      {/* Popular Categories Preview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Popular Categories</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 3).map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-secondary">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Items Preview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Trending Items</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trendingItems.slice(0, 3).map((item) => (
            <Link
              to={`/items/${item.id}`}
              key={item.id}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition"
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

export default Home;
