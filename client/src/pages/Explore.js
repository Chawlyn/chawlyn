// src/pages/Explore.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Explore = () => {
  const { addToCart } = useCart();

  // Mock food items with more details
  const foodItems = {
    'Fast Food': [
      {
        id: 1,
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with melted cheese, fresh lettuce, and special sauce',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        rating: 4.8,
        vendor: 'Burger King',
        preparationTime: '15-20 mins'
      },
      {
        id: 2,
        name: 'Crispy Chicken Wings',
        description: '8 pieces of crispy fried wings with your choice of sauce',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500',
        rating: 4.6,
        vendor: 'Wing Stop',
        preparationTime: '20-25 mins'
      }
    ],
    'Healthy Options': [
      {
        id: 3,
        name: 'Quinoa Power Bowl',
        description: 'Protein-packed bowl with quinoa, roasted vegetables, and avocado',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        rating: 4.7,
        vendor: 'Healthy Bites',
        preparationTime: '15-20 mins'
      },
      {
        id: 4,
        name: 'Grilled Salmon Salad',
        description: 'Fresh grilled salmon with mixed greens and citrus dressing',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500',
        rating: 4.9,
        vendor: 'Ocean Fresh',
        preparationTime: '20-25 mins'
      }
    ],
    'Local Cuisine': [
      {
        id: 5,
        name: 'Jollof Rice Special',
        description: 'Traditional jollof rice with grilled chicken and plantains',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
        rating: 4.9,
        vendor: 'African Delights',
        preparationTime: '25-30 mins'
      },
      {
        id: 6,
        name: 'Suya Platter',
        description: 'Grilled spicy beef skewers with onions and tomatoes',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
        rating: 4.8,
        vendor: 'Nigerian Spice',
        preparationTime: '20-25 mins'
      }
    ],
    'Desserts': [
      {
        id: 7,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
        rating: 4.7,
        vendor: 'Sweet Treats',
        preparationTime: '10-15 mins'
      },
      {
        id: 8,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
        rating: 4.8,
        vendor: 'Dolce Vita',
        preparationTime: '5-10 mins'
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Explore Our Menu</h1>

      {/* Categories and Items */}
      {Object.entries(foodItems).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{category}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <span className="text-green-600 font-semibold">${item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{item.vendor}</span>
                    <span className="text-yellow-500 font-semibold">★ {item.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.preparationTime}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
