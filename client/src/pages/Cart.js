// src/pages/Cart.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Jollof Rice', price: 4500, quantity: 1 },
    { id: 2, name: 'Fried Plantains', price: 500, quantity: 2 },
    { id: 3, name: 'Extra Chicken', price: 750, quantity: 1 },
  ]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (itemId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total - discount;
  };

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(0.1 * cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-background min-h-screen">
      {/* Cart Items Section */}
      <div className="w-full md:w-3/4 space-y-4">
        <h1 className="text-3xl font-bold text-primary mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between bg-white p-4 rounded-lg shadow-md">
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
                <p className="text-secondary font-semibold">Subtotal: ₦{(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sidebar Section */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md mt-6 md:mt-0 md:ml-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Order Summary</h2>
        <div className="mb-4">
          <p className="text-lg">Subtotal: ₦{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
          <p className="text-lg">Discount: ₦{discount.toFixed(2)}</p>
          <p className="text-2xl font-bold mt-2">Total: ₦{calculateTotalPrice().toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={applyCoupon} className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition w-full">
            Apply Coupon
          </button>
        </div>
        <Link to="/checkout" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition block text-center">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
