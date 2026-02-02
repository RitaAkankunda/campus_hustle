import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-6">
            <AlertCircle className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg"
            >
              <Home className="h-5 w-5 mr-2" />
              Go to Homepage
            </Link>
            
            <Link
              to="/hustlers"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium border border-gray-300 shadow-md"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Entrepreneurs
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/hustlers"
                className="text-purple-600 hover:text-purple-700 hover:underline transition-colors"
              >
                Entrepreneurs
              </Link>
              <Link
                to="/categories"
                className="text-purple-600 hover:text-purple-700 hover:underline transition-colors"
              >
                Services
              </Link>
              <Link
                to="/blog"
                className="text-purple-600 hover:text-purple-700 hover:underline transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-purple-600 hover:text-purple-700 hover:underline transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

