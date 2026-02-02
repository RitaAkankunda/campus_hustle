import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDashboard from '../components/Admin/ProductDashboard';
import { Product, Hustler } from '../types';
import { useNotifications } from '../components/Notification';
import { getApiUrl, getAuthHeaders } from '../utils/api';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showError } = useNotifications();
  const [currentHustler, setCurrentHustler] = useState<Hustler | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in
  const currentUserId = localStorage.getItem('currentHustlerId');
  
  // Redirect to login if not logged in or trying to access someone else's dashboard
  useEffect(() => {
    if (!currentUserId) {
      showError(
        'Login Required',
        'Please log in to access your dashboard.',
        5000
      );
      navigate('/login');
      return;
    }
    
    if (id && String(currentUserId) !== String(id)) {
      showError(
        'Access Denied',
        'You can only access your own dashboard.',
        5000
      );
      navigate(`/dashboard/${currentUserId}`);
      return;
    }
  }, [currentUserId, id, navigate, showError]);

  useEffect(() => {
    // Don't fetch if user is not logged in (will redirect)
    if (!currentUserId) {
      setLoading(false);
      return;
    }
    
    const fetchHustler = async () => {
      // Use logged-in user's ID if no ID in URL, or verify the ID matches
      const hustlerId = id || currentUserId;
      
      // Ensure user can only access their own dashboard
      if (id && String(currentUserId) !== String(id)) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(getApiUrl('/api/hustlers'));
        const data = await res.json();
        const found = data.find((h: Hustler) => String(h.id) === String(hustlerId));
        if (found) {
          setCurrentHustler(found);
        }
      } catch (err) {
        console.error('Error fetching hustler:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHustler();
  }, [id, currentUserId]);

  const handleUpdateProduct = async (productId: string, updates: Partial<Product>) => {
    if (!currentHustler) return;
    
    try {
      const updatedProducts = currentHustler.products.map((product: Product) =>
        product.id === productId
          ? { ...product, ...updates }
          : product
      );

      const res = await fetch(getApiUrl(`/api/hustlers/${currentHustler.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ products: updatedProducts })
      });

      if (res.ok) {
        const updated = await res.json();
        setCurrentHustler(updated);
      }
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!currentHustler) return;

    try {
      const updatedProducts = currentHustler.products.filter((product: Product) => product.id !== productId);

      const res = await fetch(getApiUrl(`/api/hustlers/${currentHustler.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ products: updatedProducts })
      });

      if (res.ok) {
        const updated = await res.json();
        setCurrentHustler(updated);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    if (!currentHustler) return;

    const newProduct: Product = {
      ...productData,
      id: `p${Date.now()}`,
      images: productData.images || [],
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };

    try {
      const updatedProducts = [...currentHustler.products, newProduct];

      const res = await fetch(getApiUrl(`/api/hustlers/${currentHustler.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ products: updatedProducts })
      });

      if (res.ok) {
        const updated = await res.json();
        setCurrentHustler(updated);
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentHustler) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">The profile you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/hustlers')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
          >
            Browse Entrepreneurs
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductDashboard
      hustler={currentHustler}
      onUpdateProduct={handleUpdateProduct}
      onDeleteProduct={handleDeleteProduct}
      onAddProduct={handleAddProduct}
      onDeleteProfile={handleDeleteProfile}
    />
  );
};

export default Dashboard;
