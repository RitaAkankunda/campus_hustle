import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDashboard from '../components/Admin/ProductDashboard';
import { hustlers } from '../data/cleanMockData';
import { rewards } from '../data/mockRewards';
import Rewards from '../components/Rewards';
import EventCalendar from '../components/EventCalendar';
import { Product } from '../types';
import { useNotifications } from '../components/Notification';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showError } = useNotifications();
  
  // In a real app, this would come from authentication state
  const [currentHustler, setCurrentHustler] = useState(() => {
    return hustlers.find(h => h.id === id) || hustlers[0];
  });

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    setCurrentHustler(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === productId
          ? { ...product, ...updates }
          : product
      )
    }));
  };

  const handleDeleteProduct = (productId: string) => {
    setCurrentHustler(prev => ({
      ...prev,
      products: prev.products.filter(product => product.id !== productId)
    }));
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `p${Date.now()}` // Simple ID generation
    };
    
    setCurrentHustler(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const handleDeleteProfile = () => {
    // In a real app, this would make an API call
    showError(
      'Profile Deleted',
      'Your profile has been permanently deleted. You have been logged out.',
      6000
    );
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (!currentHustler) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <EventCalendar />
      <Rewards rewards={rewards} />
      <ProductDashboard
        hustler={currentHustler}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddProduct={handleAddProduct}
        onDeleteProfile={handleDeleteProfile}
      />
    </>
  );
};

export default Dashboard;
