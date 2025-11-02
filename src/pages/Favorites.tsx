import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, HeartOff, ArrowLeft, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import HustlerCard from '../components/Hustlers/HustlerCard';
import { useFavorites } from '../hooks/useFavorites';
import { useNotifications } from '../components/Notification';
import { getApiUrl } from '../utils/api';

const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();
  const [hustlers, setHustlers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    const fetchHustlers = async () => {
      try {
        const res = await fetch(getApiUrl('/api/hustlers'));
        const data = await res.json();
        // Filter to only show favorited hustlers
        const favoritedHustlers = data.filter((h: any) => favorites.includes(h.id));
        setHustlers(favoritedHustlers);
      } catch (err) {
        setHustlers([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (favorites.length > 0) {
      fetchHustlers();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearFavorites();
      setHustlers([]);
      showSuccess('Favorites Cleared', 'All favorites have been removed.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/hustlers"
            className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to All Entrepreneurs
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Heart className="h-10 w-10 text-red-500 fill-red-500" />
                My Favorites
              </h1>
              <p className="text-lg text-gray-600">
                {favorites.length === 0 
                  ? "You haven't saved any entrepreneurs yet"
                  : `${favorites.length} saved ${favorites.length === 1 ? 'entrepreneur' : 'entrepreneurs'}`}
              </p>
            </div>
            
            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <HeartOff className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Favorites Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring entrepreneurs and save your favorites by clicking the heart icon on their profiles.
            </p>
            <Link
              to="/hustlers"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
            >
              Browse Entrepreneurs
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {hustlers.map((hustler, index) => (
              <motion.div
                key={hustler.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <HustlerCard hustler={hustler} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Helpful Tip */}
        {favorites.length > 0 && (
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <p className="text-blue-800">
              💡 <strong>Tip:</strong> Your favorites are saved locally and will persist across sessions. 
              You can quickly access your saved entrepreneurs from this page anytime!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

