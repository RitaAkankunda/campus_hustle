import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categories } from '../../data/cleanMockData';

// Map category IDs to relevant service images
const categoryImages: { [key: string]: string } = {
  '1': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=400&fit=crop', // Beauty & Hair - Hair styling
  '2': 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=400&fit=crop', // Tech & Design - Laptop/coding
  '3': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop', // Snacks & Treats - Snacks and drinks
  '4': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&h=400&fit=crop', // Events & Photography - Camera/photography
  '5': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=400&fit=crop', // Academics - Books and studying
  '6': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=400&fit=crop', // Totebag & Accessories - Fashion accessories
};

const CategoriesSection: React.FC = () => {
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
          {categories.map((category, index) => {
            const categoryImage = categoryImages[category.id] || categoryImages['1'];
            
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={categoryImage}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
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