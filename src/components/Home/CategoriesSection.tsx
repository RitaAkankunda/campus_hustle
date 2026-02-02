import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../../data/cleanMockData';

const CategoriesSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

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

  // Auto-rotate images every 3 seconds
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mary Stuart Hall Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover talented entrepreneurs in your hall offering amazing services right at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const images = category.images || [];
            const currentIndex = currentImageIndex[category.id] || 0;
            const displayedImage = images[currentIndex] || 'https://via.placeholder.com/500x400?text=No+Image';
            const hasMultipleImages = images.length > 1;
            
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Background Image with Carousel */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={displayedImage}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Image Navigation Buttons */}
                  {hasMultipleImages && (
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
                        {images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${
                              idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                            }`}
                          />
                        ))}
                      </div>
                    </>
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
                    {category.count} MSH entrepreneurs available
                  </p>
                  
                  {/* CTA */}
                  <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-500">
                    Explore Services
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-500" />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;