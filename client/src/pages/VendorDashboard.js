import React, { useState } from 'react';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Placeholder data (replace with API calls)
  const stats = {
    totalOrders: 50,
    pendingOrders: 8,
    revenue: 150000,
  };

  const menuItems = [
    { id: 1, name: 'Jollof Rice', price: 2500, availability: 'Available' },
    { id: 2, name: 'Fried Rice', price: 3000, availability: 'Out of Stock' },
    { id: 3, name: 'Chicken', price: 1500, availability: 'Available' },
  ];

  const orders = [
    { id: 1, customer: 'John Doe', item: 'Jollof Rice', status: 'Preparing', total: 2500 },
    { id: 2, customer: 'Jane Smith', item: 'Fried Rice', status: 'Delivered', total: 3000 },
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-primary">{stats.totalOrders}</h2>
        <p className="text-gray-600">Total Orders</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-primary">{stats.pendingOrders}</h2>
        <p className="text-gray-600">Pending Orders</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-primary">₦{stats.revenue.toLocaleString()}</h2>
        <p className="text-gray-600">Total Revenue</p>
      </div>
    </div>
  );

  const renderMenu = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">Menu</h2>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition">
          Add Item
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Availability</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.name}</td>
                <td className="p-4">₦{item.price}</td>
                <td className="p-4">{item.availability}</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  {' | '}
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h2 className="text-xl font-bold text-primary mb-4">Orders</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Item</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.item}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">₦{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <h2 className="text-xl font-bold text-primary mb-4">Settings</h2>
      <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-gray-700">Business Name</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Enter business name" />
        </div>
        <div>
          <label className="block text-gray-700">Business Address</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Enter business address" />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition">
          Save Changes
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Vendor Dashboard</h1>
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'menu' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'settings' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'menu' && renderMenu()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default VendorDashboard;
