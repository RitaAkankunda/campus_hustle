import React from 'react';
import { usePlatformEarnings } from '../hooks/usePlatformEarnings';

const AdminDashboard: React.FC = () => {
  // This is a placeholder for owner-only dashboard logic
  // You can add authentication/authorization logic here
  const { earnings, subscriptionHistory } = usePlatformEarnings();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">Owner Dashboard</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Platform Earnings</h2>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-gray-500 text-xs">Total Subscriptions</div>
              <div className="text-2xl font-bold text-purple-700">UGX {earnings.totalSubscriptions.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Active Subscribers</div>
              <div className="text-2xl font-bold text-purple-700">{earnings.activeSubscribers}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Monthly Subscriptions</div>
              <div className="text-xl font-semibold text-purple-600">UGX {earnings.monthlySubscriptions.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Last Updated</div>
              <div className="text-sm text-gray-700">{new Date(earnings.lastUpdated).toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Subscription Payments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left">Entrepreneur</th>
                  <th className="px-3 py-2 text-left">Plan</th>
                  <th className="px-3 py-2 text-left">Amount</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Start</th>
                  <th className="px-3 py-2 text-left">End</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionHistory.slice(0, 10).map(sub => (
                  <tr key={sub.id} className="border-b last:border-b-0">
                    <td className="px-3 py-2">{sub.entrepreneurName}</td>
                    <td className="px-3 py-2 capitalize">{sub.planType}</td>
                    <td className="px-3 py-2">UGX {sub.amount.toLocaleString()}</td>
                    <td className="px-3 py-2">{sub.status}</td>
                    <td className="px-3 py-2">{sub.startDate}</td>
                    <td className="px-3 py-2">{sub.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
