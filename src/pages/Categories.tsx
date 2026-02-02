import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../data/cleanMockData';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { getApiUrl } from '../utils/api';
import { Hustler } from '../types';

const Categories: React.FC = () => {
  const [hustlers, setHustlers] = useState<Hustler[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchHustlers = async () => {
      try {
        const res = await fetch(getApiUrl('/api/hustlers'));
        const data = await res.json();
        setHustlers(data);
      } catch {
        setHustlers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHustlers();
  }, []);

  // Initialize image indices
  useEffect(() => {
    const indices: { [key: string]: number } = {};
    categories.forEach(category => {
      if (category.images && category.images.length > 0) {
        indices[category.id] = 0;
      }
    });
    setCurrentImageIndex(indices);
  }, []);

  const handleImageChange = (categoryId: string, direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const category = categories.find(c => c.id === categoryId);
    if (!category?.images || category.images.length === 0) return;

    setCurrentImageIndex(prev => {
      const currentIndex = prev[categoryId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % category.images.length;
      } else {
        newIndex = (currentIndex - 1 + category.images.length) % category.images.length;
      }
      
      return { ...prev, [categoryId]: newIndex };
    });
  };

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      categories.forEach(category => {
        if (category.images && category.images.length > 1) {
          setCurrentImageIndex(prev => {
            const currentIndex = prev[category.id] || 0;
            const newIndex = (currentIndex + 1) % category.images.length;
            return { ...prev, [category.id]: newIndex };
          });
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Calculate real counts for each category
  const categoriesWithCounts = categories.map(category => {
    const categoryHustlers = hustlers.filter((h: Hustler) => h.category === category.name);
    return {
      ...category,
      count: categoryHustlers.length,
      hustlers: categoryHustlers.slice(0, 3), // Show first 3 as preview
      totalHustlers: categoryHustlers.length
    };
  });

  // Sort by count (most popular first)
  const sortedCategories = [...categoriesWithCounts].sort((a, b) => b.count - a.count);

  // Get total hustlers across all categories
  const totalHustlers = hustlers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Browse Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Find student entrepreneurs by their expertise and services
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalHustlers}</div>
              <div className="text-sm text-gray-600">Total Entrepreneurs</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Service Categories</div>
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCategories.map((category, index) => {
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/category/${category.id}`}
                    className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 block"
                  >
                      {/* Background Image with Carousel */}
                      <div className="relative h-48 overflow-hidden">
                        {category.images && category.images.length > 0 ? (
                          <>
                            <img
                              src={category.images[currentImageIndex[category.id] || 0]}
                              alt={category.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            
                            {/* Image Navigation Buttons */}
                            {category.images.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => handleImageChange(category.id, 'prev', e)}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                  aria-label="Previous image"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={(e) => handleImageChange(category.id, 'next', e)}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                  aria-label="Next image"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                                
                                {/* Image Indicators */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                  {category.images.map((_, idx) => (
                                    <div
                                      key={idx}
                                      className={`h-1.5 rounded-full transition-all ${
                                        idx === (currentImageIndex[category.id] || 0) ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-lg">{category.icon}</span>
                          </div>
                        )}
                        
                        {/* Overlay gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`}></div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-6">
                        {/* Text content */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-500">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 mb-4 transition-colors duration-500">
                          {category.count} MSH {category.count === 1 ? 'entrepreneur' : 'entrepreneurs'} available
                        </p>
                        
                        {/* CTA */}
                        <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-500">
                          Explore Services
                          <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-500" />
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                        <ArrowRight className="h-6 w-6 text-white" />
                      </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Business?</h2>
            <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
              Join our community of student entrepreneurs and start offering your services to fellow MSH students today!
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg transform hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              Get Started Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
