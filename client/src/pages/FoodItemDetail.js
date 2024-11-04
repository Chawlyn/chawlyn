// src/pages/FoodItemDetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const FoodItemDetail = () => {
  const { itemId } = useParams(); // Retrieve item ID from URL parameters

  // Example item data (replace with API data)
  const item = {
    id: itemId,
    name: 'Jollof Rice',
    description: 'Delicious, spicy rice cooked with a blend of African spices.',
    ingredients: ['Rice', 'Tomatoes', 'Peppers', 'Onions', 'Spices'],
    price: 4500, // Price in Naira
    sizes: ['Small', 'Medium', 'Large'],
    toppings: [
      { id: 1, name: 'Extra Chicken', price: 750 },
      { id: 2, name: 'Fried Plantains', price: 500 },
      { id: 3, name: 'Salad', price: 400 },
    ],
  };

  // State for selected options
  const [selectedSize, setSelectedSize] = useState(item.sizes[1]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  // Add topping to the selectedToppings array
  const addTopping = (topping) => {
    if (!selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings((prevToppings) => [...prevToppings, topping]);
    }
  };

  // Remove topping from the selectedToppings array
  const removeTopping = (topping) => {
    setSelectedToppings((prevToppings) => prevToppings.filter((t) => t.id !== topping.id));
  };

  // Calculate total price based on selected options
  const calculateTotalPrice = () => {
    const toppingsCost = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
    return item.price + toppingsCost;
  };

  const addToCart = () => {
    console.log(`Added ${item.name} to cart with size ${selectedSize} and toppings`, selectedToppings);
    // Implement actual add to cart functionality here
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Food Item Information */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">{item.name}</h1>
        <p className="text-gray-700">{item.description}</p>
        <p className="text-primary font-semibold mt-4">Base Price: ₦{item.price.toFixed(2)}</p>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700">
          {item.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Size Options */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">Select Size</h2>
        <div className="flex space-x-4">
          {item.sizes.map((size) => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Toppings Options */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">Choose Toppings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {item.toppings.map((topping) => (
            <div key={topping.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <span className="text-gray-700">{topping.name} (+₦{topping.price.toFixed(2)})</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => removeTopping(topping)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  disabled={!selectedToppings.some((t) => t.id === topping.id)}
                >
                  -
                </button>
                <button
                  onClick={() => addTopping(topping)}
                  className="bg-primary text-white px-2 py-1 rounded hover:bg-secondary transition"
                  disabled={selectedToppings.some((t) => t.id === topping.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display Selected Toppings */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-primary mb-2">Added Toppings:</h2>
        <ul className="list-disc list-inside text-gray-700">
          {selectedToppings.length > 0 ? (
            selectedToppings.map((topping) => <li key={topping.id}>+ {topping.name}</li>)
          ) : (
            <p className="text-gray-500">No toppings added.</p>
          )}
        </ul>
      </div>

      {/* Total Price and Add to Cart */}
      <div className="flex flex-col items-start mt-6">
        <p className="text-2xl font-semibold text-secondary mb-4">Total: ₦{calculateTotalPrice().toFixed(2)}</p>
        <button
          onClick={addToCart}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodItemDetail;
