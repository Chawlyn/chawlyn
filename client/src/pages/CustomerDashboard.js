import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OrderCardSkeleton } from '../components/Skeleton';

const CustomerDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    savedVendors: 0,
    totalSpent: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalOrders: 12,
        activeOrders: 2,
        savedVendors: 5,
        totalSpent: 45000
      });
      setRecentOrders([
        {
          id: 1,
          vendor: 'Tasty Bites',
          status: 'preparing',
          items: 3,
          total: 8500,
          time: '2 hours ago'
        },
        {
          id: 2,
          vendor: 'Spice Garden',
          status: 'delivered',
          items: 2,
          total: 6500,
          time: '1 day ago'
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      preparing: 'bg-nigerianOrange text-white',
      delivering: 'bg-nigerianPurple text-white',
      delivered: 'bg-nigerianGreen text-white',
      cancelled: 'bg-red-500 text-white'
    };
    return colors[status] || 'bg-gray-200 text-gray-700';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: stats.totalOrders, icon: '📦' },
          { label: 'Active Orders', value: stats.activeOrders, icon: '🚚' },
          { label: 'Saved Vendors', value: stats.savedVendors, icon: '❤️' },
          { label: 'Total Spent', value: formatCurrency(stats.totalSpent), icon: '💰' }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Orders */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Active Orders</h2>
          <Link
            to="/order-tracking"
            className="text-nigerianOrange hover:text-nigerianBrown transition-colors duration-200"
          >
            View All
          </Link>
        </div>
        {isLoading ? (
          <div className="space-y-4">
            <OrderCardSkeleton />
            <OrderCardSkeleton />
          </div>
        ) : recentOrders.filter(order => order.status === 'preparing' || order.status === 'delivering').length > 0 ? (
          <div className="space-y-4">
            {recentOrders
              .filter(order => order.status === 'preparing' || order.status === 'delivering')
              .map(order => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{order.vendor}</h3>
                      <p className="text-sm text-gray-500 mt-1">{order.items} items • {order.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-800 font-semibold">{formatCurrency(order.total)}</span>
                    <Link
                      to={`/order-tracking/${order.id}`}
                      className="text-nigerianOrange hover:text-nigerianBrown transition-colors duration-200"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No active orders</p>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <Link
            to="/order-history"
            className="text-nigerianOrange hover:text-nigerianBrown transition-colors duration-200"
          >
            View All
          </Link>
        </div>
        {isLoading ? (
          <div className="space-y-4">
            <OrderCardSkeleton />
            <OrderCardSkeleton />
          </div>
        ) : recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{order.vendor}</h3>
                    <p className="text-sm text-gray-500 mt-1">{order.items} items • {order.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">{formatCurrency(order.total)}</span>
                  <Link
                    to={`/order-history/${order.id}`}
                    className="text-nigerianOrange hover:text-nigerianBrown transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent orders</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
