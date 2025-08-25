import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, hustlers } from '../data/cleanMockData';

const Categories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find student entrepreneurs by their expertise and services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const categoryHustlers = hustlers.filter(h => h.category === category.name);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-8 -translate-y-8"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full transform -translate-x-6 translate-y-6"></div>
                    </div>
                    <div className="relative z-10 p-6 h-full flex items-center">
                      <div className="text-4xl mb-2">{category.icon}</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.count} hustlers available</p>
                    
                    {/* Sample hustlers */}
                    <div className="space-y-2 mb-4">
                      {categoryHustlers.slice(0, 3).map((hustler) => (
                        <div key={hustler.id} className="flex items-center space-x-3">
                          <img
                            src={hustler.profileImage}
                            alt={hustler.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{hustler.name}</div>
                            <div className="text-xs text-gray-500">{hustler.university}</div>
                          </div>
                        </div>
                      ))}
                      {categoryHustlers.length > 3 && (
                        <div className="text-sm text-purple-600 font-medium">
                          +{categoryHustlers.length - 3} more hustlers
                        </div>
                      )}
                    </div>
                    
                    <div className="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                      Explore {category.name}
                      <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;