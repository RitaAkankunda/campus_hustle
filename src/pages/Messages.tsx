import React from 'react';
import { hustlers } from '../data/cleanMockData';
import MessagingInbox from '../components/MessagingInbox';

const MessagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Messages</h1>
        <MessagingInbox hustlers={hustlers} />
      </div>
    </div>
  );
};

export default MessagesPage;
