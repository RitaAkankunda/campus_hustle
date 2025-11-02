import React from 'react';
import { useNotifications } from '../components/Notification';

const NotificationTest: React.FC = () => {
  const { showSuccess, showError, showInfo, showWarning } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">MSH Connect Notification System</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Test Different Notification Types</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => showSuccess(
                'Success! 🎉',
                'Your product has been added successfully to MSH Connect!',
                5000
              )}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Show Success Notification
            </button>
            
            <button
              onClick={() => showError(
                'Oops! Something went wrong',
                'Unable to process your request. Please check your connection and try again.',
                6000
              )}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Show Error Notification
            </button>
            
            <button
              onClick={() => showWarning(
                'Important Notice',
                'Your product "Custom Cake" is running low on stock. Consider restocking soon.',
                5000
              )}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Show Warning Notification
            </button>
            
            <button
              onClick={() => showInfo(
                'New Feature Available! ✨',
                'You can now add multiple images to your products for better showcase.',
                4000
              )}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Show Info Notification
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
            <h3 className="font-semibold text-pink-900 mb-2">Features of MSH Connect Notifications:</h3>
            <ul className="text-sm text-pink-800 space-y-1">
              <li>✨ Beautiful, branded design matching MSH Connect theme</li>
              <li>🎯 Different types: Success, Error, Warning, Info</li>
              <li>⏱️ Auto-dismiss with customizable duration</li>
              <li>📱 Mobile-responsive and touch-friendly</li>
              <li>🔄 Smooth animations and transitions</li>
              <li>🎨 Progress bar showing remaining time</li>
              <li>❌ Manual close option for users</li>
              <li>📍 Fixed position - won't interfere with content</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NotificationTest;
