// src/pages/Cart.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Example cart items (replace with dynamic cart data from context or API)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Jollof Rice', price: 4500, quantity: 1 },
    { id: 2, name: 'Fried Plantains', price: 500, quantity: 2 },
    { id: 3, name: 'Extra Chicken', price: 750, quantity: 1 },
  ]);

  // Update quantity for a cart item
  const updateQuantity = (itemId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Remove item from the cart
  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div>
                  <h2 className="text-lg font-bold text-secondary">{item.name}</h2>
                  <p className="text-primary font-semibold">₦{item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="text-gray-700 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-primary text-white px-2 py-1 rounded hover:bg-secondary transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-secondary font-semibold">
                    Subtotal: ₦{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price and Checkout */}
          <div className="border-t pt-4">
            <p className="text-2xl font-semibold text-secondary mb-4">
              Total: ₦{calculateTotalPrice().toFixed(2)}
            </p>
            <Link
              to="/checkout"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
