// src/pages/OrderDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { orderId } = useParams(); // Get the order ID from the URL

  return (
    <div className="p-6 bg-background min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Order Details</h1>
      <p className="text-lg text-gray-700 mb-4">Order ID: {orderId}</p>
      {/* Add detailed order information here */}
    </div>
  );
};

export default OrderDetail;
