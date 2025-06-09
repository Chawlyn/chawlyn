import React from 'react';
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Revenue',
    value: '$12,345',
    change: '+12%',
    icon: CurrencyDollarIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Total Orders',
    value: '234',
    change: '+8%',
    icon: ShoppingBagIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Total Customers',
    value: '1,234',
    change: '+15%',
    icon: UserGroupIcon,
    color: 'bg-purple-500',
  },
  {
    name: 'Average Rating',
    value: '4.8',
    change: '+0.2',
    icon: StarIcon,
    color: 'bg-yellow-500',
  },
];

const recentOrders = [
  {
    id: 1,
    customer: 'John Doe',
    items: 3,
    total: '$45.99',
    status: 'Completed',
    time: '2 hours ago',
  },
  {
    id: 2,
    customer: 'Jane Smith',
    items: 2,
    total: '$29.99',
    status: 'Preparing',
    time: '3 hours ago',
  },
  {
    id: 3,
    customer: 'Mike Johnson',
    items: 4,
    total: '$59.99',
    status: 'Pending',
    time: '4 hours ago',
  },
];

const VendorOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className={`h-6 w-6 ${stat.color} text-white rounded-md p-1`}
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className="font-medium text-green-600">
                  {stat.change}
                </span>
                <span className="text-gray-500"> from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Orders
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <li key={order.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {order.customer[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items} items • {order.total}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Preparing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="ml-4 text-sm text-gray-500">
                      {order.time}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorOverview; 