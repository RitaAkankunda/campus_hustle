import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Crown, Sparkles, Heart } from 'lucide-react';

const FeaturedHustlers: React.FC = () => {
  const [featuredHustlers, setFeaturedHustlers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedHustlers = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/hustlers');
        const data = await res.json();
        const featured = data.filter((h: any) => h.featured).slice(0, 3);
        setFeaturedHustlers(featured);
      } catch (err) {
        setFeaturedHustlers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedHustlers();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            MSH Entrepreneurs of the Week 🌸
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the amazing entrepreneurs making waves in Mary Stuart Hall this week
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading featured entrepreneurs...</p>
          </div>
        ) : featuredHustlers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No featured entrepreneurs at the moment.</p>
            <p className="text-gray-500 mt-2">Check back soon for featured MSH entrepreneurs!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHustlers.map((hustler, index) => (
            <div key={hustler.id} className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/10 group-hover:to-purple-600/10 transition-all duration-500 z-10"></div>
              
              <div className="relative z-20">
                <div className="relative">
                  <img
                    src={hustler.profileImage}
                    alt={hustler.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Featured badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center animate-pulse">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Featured
                    </div>
                  </div>
                  
                  {/* Rating badge */}
                  <div className="absolute bottom-4 left-4 flex items-center bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-bold text-gray-800">{hustler.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({hustler.reviewCount})</span>
                  </div>

                  {/* Position indicator */}
                  <div className="absolute top-4 left-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{hustler.name}</h3>
                  </div>

                  <div className="inline-flex items-center text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-4 font-medium">
                    <Heart className="h-4 w-4 mr-1" />
                    {hustler.category}
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{hustler.location} • {hustler.university}</span>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{hustler.bio}</p>

                  {/* Services preview */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {hustler.services.slice(0, 2).map((service, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                      {hustler.services.length > 2 && (
                        <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
                          +{hustler.services.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/hustler/${hustler.id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      View Profile
                    </Link>
                    <a
                      href={`https://wa.me/${hustler.whatsapp.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors duration-300 shadow-lg"
                    >
                      <Phone className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedHustlers;
