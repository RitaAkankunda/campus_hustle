import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import HustlerCard from '../components/Hustlers/HustlerCard';
import SearchFilters from '../components/Hustlers/SearchFilters';
import { getApiUrl } from '../utils/api';
import { categories } from '../data/cleanMockData';
import { Hustler, Product } from '../types';
// import { hustlers } from '../data/cleanMockData';


const Hustlers: React.FC = () => {
  const { id: categoryId } = useParams<{ id?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string } | undefined>(undefined);
  const [hustlers, setHustlers] = useState<Hustler[]>([]);

  useEffect(() => {
    const fetchHustlers = async () => {
      try {
        const res = await fetch(getApiUrl('/api/hustlers'));
        if (!res.ok) {
          throw new Error(`Failed to fetch hustlers: ${res.status}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format');
        }
        setHustlers(data);
      } catch (_err) {
        setHustlers([]);
      }
    };
    fetchHustlers();
  }, []);

  // Set category filter from URL parameter
  useEffect(() => {
    if (categoryId) {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        setSelectedCategory(category.name);
      }
    } else {
      // If no category ID in URL, clear the filter
      setSelectedCategory('');
    }
  }, [categoryId]);

  const filteredAndSortedHustlers = useMemo(() => {
    // First, apply filters
    const filtered = hustlers.filter((hustler: Hustler) => {
      const matchesSearch = searchQuery === '' ||
        hustler.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hustler.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hustler.services || []).some((service: string) => service.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !selectedCategory || hustler.category === selectedCategory;
      const matchesLocation = !selectedLocation || hustler.location === selectedLocation;
      const matchesUniversity = !selectedUniversity || hustler.university === selectedUniversity;
      
      // Rating filter
      const matchesRating = minRating === undefined || (hustler.rating || 0) >= minRating;

      // Price range filter (check if any product matches)
      const matchesPrice = !priceRange || (priceRange.min === '' && priceRange.max === '') ||
        (hustler.products || []).some((_product: Product) => {
          const priceMatch = true; // Price parsing would be more complex, simplified for now
          return priceMatch;
        });

      return matchesSearch && matchesCategory && matchesLocation && matchesUniversity && matchesRating && matchesPrice;
    });

    // Then, apply sorting
    const sorted = [...filtered].sort((a: Hustler, b: Hustler) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'reviews':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'newest':
          return new Date(b.joinedDate || 0).getTime() - new Date(a.joinedDate || 0).getTime();
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        default:
          return 0;
      }
    });

    return sorted;
  }, [hustlers, searchQuery, selectedCategory, selectedLocation, selectedUniversity, sortBy, minRating, priceRange]);

  // Featured hustlers (promotions)
  const featuredHustlers = hustlers.filter((h: Hustler) => h.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {selectedCategory 
              ? `${selectedCategory} - MSH Entrepreneurs 🌸`
              : 'Mary Stuart Hall Entrepreneurs 🌸'
            }
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {selectedCategory
              ? `Discover talented entrepreneurs in Mary Stuart Hall offering ${selectedCategory.toLowerCase()} services`
              : 'Discover amazing talented ladies in Mary Stuart Hall offering exceptional services'
            }
          </p>
        </div>

        {/* Featured Hustlers Carousel */}
        {featuredHustlers.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-purple-700 mb-4">🌟 Featured Hustlers</h2>
            <div className="flex space-x-6 overflow-x-auto pb-2">
              {featuredHustlers.map(hustler => (
                <div key={hustler.id} className="min-w-[320px] max-w-xs">
                  <HustlerCard hustler={hustler} />
                </div>
              ))}
            </div>
          </div>
        )}

        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedUniversity={selectedUniversity}
          setSelectedUniversity={setSelectedUniversity}
          sortBy={sortBy}
          setSortBy={setSortBy}
          minRating={minRating}
          setMinRating={setMinRating}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredAndSortedHustlers.length} MSH Entrepreneurs Found
          </h2>
          {(minRating || priceRange) && (
            <div className="text-sm text-gray-600">
              Filters active: {minRating && `${minRating}+ ⭐`} {priceRange && '(Price range)'}
            </div>
          )}
        </div>

        {filteredAndSortedHustlers.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filteredAndSortedHustlers.map((hustler, index) => (
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