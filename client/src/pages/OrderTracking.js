// src/pages/OrderTracking.js
import React, { useState, useEffect } from 'react';

const OrderTracking = () => {
  const [orderStatus, setOrderStatus] = useState('Preparing'); // Initial status
  const [driverLocation, setDriverLocation] = useState({ lat: 4.824167, lng: 7.033611 }); // Port Harcourt coordinates

  // Simulate real-time status updates
  useEffect(() => {
    const statusUpdates = ['Preparing', 'On the way', 'Delivered'];
    let index = 0;

    const statusInterval = setInterval(() => {
      setOrderStatus(statusUpdates[index]);
      index++;
      if (index >= statusUpdates.length) clearInterval(statusInterval);
    }, 5000); // Update every 5 seconds for demonstration

    return () => clearInterval(statusInterval);
  }, []);

  // Placeholder for simulating driver's location changes
  useEffect(() => {
    if (orderStatus === 'On the way') {
      const locationInterval = setInterval(() => {
        setDriverLocation((prevLocation) => ({
          lat: prevLocation.lat + 0.0001, // Move slightly
          lng: prevLocation.lng + 0.0001,
        }));
      }, 3000); // Update location every 3 seconds for demonstration

      return () => clearInterval(locationInterval);
    }
  }, [orderStatus]);

  return (
    <div className="p-6 bg-background min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Order Tracking</h1>

      {/* Order Status */}
      <div className="mb-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-secondary mb-2">Order Status: {orderStatus}</h2>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${
              orderStatus === 'Preparing'
                ? 'bg-yellow-500 w-1/3'
                : orderStatus === 'On the way'
                ? 'bg-blue-500 w-2/3'
                : 'bg-green-500 w-full'
            }`}
          ></div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full max-w-lg h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Map view showing driver’s location</p>
      </div>

      <div className="mt-4">
        <p className="text-lg text-gray-700">
          Driver’s current location: Lat {driverLocation.lat.toFixed(4)}, Lng {driverLocation.lng.toFixed(4)}
        </p>
      </div>
    </div>
  );
};

export default OrderTracking;
