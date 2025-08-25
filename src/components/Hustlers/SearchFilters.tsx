import React from 'react';
import { Search, MapPin, Home, Filter, Building } from 'lucide-react';
import { categories } from '../../data/cleanMockData';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedUniversity: string;
  setSelectedUniversity: (university: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedUniversity,
  setSelectedUniversity
}) => {
  // Makerere University campus locations
  const locations = [
    'All Campus Areas', 
    'Mary Stuart Hall', 
    'Mitchell Hall Area', 
    'Lumumba Hall Area',
    'University Hall Area',
    'New Complex',
    'Old Complex',
    'Faculty of Medicine',
    'College of Business',
    'Main Building Area'
  ];
  
  // MSH specific room areas/blocks
  const hallAreas = [
    'All MSH Areas',
    'Block A',
    'Block B', 
    'Block C',
    'Block D',
    'Ground Floor',
    'First Floor',
    'Second Floor',
    'Third Floor'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-pink-500">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-pink-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Find Your MSH Entrepreneur 🌸</h3>
        <span className="ml-auto text-sm text-pink-600 bg-pink-50 px-3 py-1 rounded-full font-medium">
          Mary Stuart Hall • Makerere University
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Campus Location Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
          >
            {locations.map((location) => (
              <option key={location} value={location === 'All Campus Areas' ? '' : location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* MSH Hall Area Filter */}
        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
          >
            {hallAreas.map((area) => (
              <option key={area} value={area === 'All MSH Areas' ? '' : area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Quick filter chips */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Quick filters:</span>
          <button 
            onClick={() => setSelectedLocation('Mary Stuart Hall')}
            className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full hover:bg-pink-200 transition-colors"
          >
            MSH Only
          </button>
          <button 
            onClick={() => setSelectedCategory('Beauty & Hair')}
            className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
          >
            Hair & Beauty
          </button>
          <button 
            onClick={() => setSelectedCategory('Food & Catering')}
            className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
          >
            Food
          </button>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedLocation('');
              setSelectedUniversity('');
            }}
            className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;