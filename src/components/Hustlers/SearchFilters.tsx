import React from 'react';
import { Search, MapPin, GraduationCap, Filter } from 'lucide-react';
import { categories } from '../../data/mockData';

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
  const locations = ['All Locations', 'Kikoni', 'Wandegeya', 'Banda', 'Nakawa', 'Mukono'];
  const universities = ['All Universities', 'Makerere University', 'Kyambogo University', 'MUBS', 'UCU'];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Find Your Perfect Hustler</h3>
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
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Location Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
          >
            {locations.map((location) => (
              <option key={location} value={location === 'All Locations' ? '' : location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* University Filter */}
        <div className="relative">
          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
          >
            {universities.map((university) => (
              <option key={university} value={university === 'All Universities' ? '' : university}>
                {university}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;