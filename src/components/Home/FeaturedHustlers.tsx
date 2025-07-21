import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, ArrowRight } from 'lucide-react';
import { hustlers } from '../../data/mockData';

const FeaturedHustlers: React.FC = () => {
  const featuredHustlers = hustlers.filter(hustler => hustler.featured).slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Hustlers of the Week
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated student entrepreneurs who are making waves on campus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHustlers.map((hustler) => (
            <div key={hustler.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={hustler.profileImage}
                  alt={hustler.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{hustler.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{hustler.name}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {hustler.category}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{hustler.location}, {hustler.university}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {hustler.bio}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    {hustler.reviewCount} reviews
                  </div>
                  <div className="text-lg font-bold text-purple-600">
                    {hustler.pricing}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Link
                    to={`/hustler/${hustler.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium"
                  >
                    View Profile
                  </Link>
                  <a
                    href={`https://wa.me/${hustler.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center text-sm font-medium flex items-center justify-center space-x-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/hustlers"
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold"
          >
            Browse All Hustlers
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHustlers;