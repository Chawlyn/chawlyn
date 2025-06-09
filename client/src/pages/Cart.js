// src/pages/Cart.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(0.1 * getCartTotal());
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };

  const calculateTotalPrice = () => {
    return getCartTotal() - discount;
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-50 min-h-screen">
      {/* Cart Items Section */}
      <div className="w-full md:w-3/4 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link to="/explore" className="text-blue-600 hover:text-blue-800">
              Continue Shopping
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">{item.vendor}</p>
                  <p className="text-green-600 font-semibold">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2 mb-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="text-gray-700 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-800 font-semibold">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Summary Section */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md mt-6 md:mt-0 md:ml-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
        <div className="mb-4">
          <p className="text-lg">Subtotal: ${getCartTotal().toFixed(2)}</p>
          <p className="text-lg">Discount: ${discount.toFixed(2)}</p>
          <p className="text-2xl font-bold mt-2">Total: ${calculateTotalPrice().toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={applyCoupon}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
          >
            Apply Coupon
          </button>
        </div>
        <Link
          to="/checkout"
          className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition block text-center ${
            cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
