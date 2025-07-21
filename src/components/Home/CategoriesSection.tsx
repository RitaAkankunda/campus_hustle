import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect student entrepreneur for your needs across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br hover:scale-105 transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${category.color.replace('from-', '#').replace('to-', '#')})`
              }}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/80 text-sm mb-4">{category.count} hustlers available</p>
                <div className="inline-flex items-center text-white text-sm font-medium">
                  Explore →
                </div>
              </div>
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;