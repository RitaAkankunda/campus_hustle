import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HustlerCard from '../components/Hustlers/HustlerCard';
import SearchFilters from '../components/Hustlers/SearchFilters';
import { hustlers } from '../data/mockData';

const Hustlers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  const filteredHustlers = useMemo(() => {
    return hustlers.filter((hustler) => {
      const matchesSearch = hustler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hustler.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hustler.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || hustler.category === selectedCategory;
      const matchesLocation = !selectedLocation || hustler.location === selectedLocation;
      const matchesUniversity = !selectedUniversity || hustler.university === selectedUniversity;

      return matchesSearch && matchesCategory && matchesLocation && matchesUniversity;
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedUniversity]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse All Hustlers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover talented student entrepreneurs across Uganda's top universities
          </p>
        </div>

        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedUniversity={selectedUniversity}
          setSelectedUniversity={setSelectedUniversity}
        />

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredHustlers.length} Hustlers Found
          </h2>
        </div>

        {filteredHustlers.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filteredHustlers.map((hustler, index) => (
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No hustlers found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search filters to find what you're looking for.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setSelectedLocation('');
                setSelectedUniversity('');
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hustlers;