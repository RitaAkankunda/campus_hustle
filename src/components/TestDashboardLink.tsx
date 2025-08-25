import React from 'react';
import { Link } from 'react-router-dom';

const TestDashboardLink: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <Link
        to="/dashboard/1"
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 text-sm"
      >
        <span>🏪</span>
        <span>Test Dashboard</span>
      </Link>
      
      <Link
        to="/test-notifications"
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 text-sm"
      >
        <span>🔔</span>
        <span>Test Notifications</span>
      </Link>
    </div>
  );
};

export default TestDashboardLink;
