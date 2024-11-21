import React from 'react';

const CustomerDashboard = () => {
  // Placeholder data (will be replaced with API data)
  const customerName = 'John Doe'; // Replace with API data
  const stats = {
    totalOrders: 15,
    pendingOrders: 3,
    favorites: 5,
  };

  const orderHistory = [
    { id: 1, date: '2024-10-01', status: 'Delivered', total: 5000 },
    { id: 2, date: '2024-10-05', status: 'Pending', total: 1200 },
    { id: 3, date: '2024-10-10', status: 'Cancelled', total: 3000 },
  ];

  const favorites = [
    { id: 1, name: 'Pizza House' },
    { id: 2, name: 'Jollof Kitchen' },
    { id: 3, name: 'Burger Place' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome, {customerName}!</h1>
          <p className="text-gray-600">Here’s your dashboard overview.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-secondary">{stats.totalOrders}</h2>
            <p className="text-gray-600">Total Orders</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-secondary">{stats.pendingOrders}</h2>
            <p className="text-gray-600">Pending Orders</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-secondary">{stats.favorites}</h2>
            <p className="text-gray-600">Favorites</p>
          </div>
        </div>

        {/* Order History Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Order History</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">{order.status}</td>
                    <td className="p-4">₦{order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-800 font-semibold">{fav.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="text-center">
          <button className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
