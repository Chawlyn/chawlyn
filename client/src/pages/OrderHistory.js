import React from 'react';

const OrderHistory = () => {
  // Placeholder for API data (to be replaced with real API calls)
  const orders = [
    { id: 1, date: '2024-10-01', status: 'Delivered', total: 4500 },
    { id: 2, date: '2024-10-05', status: 'Pending', total: 1200 },
    { id: 3, date: '2024-10-10', status: 'Cancelled', total: 3000 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-6">Order History</h1>
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
              {orders.map((order) => (
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
    </div>
  );
};

export default OrderHistory;
