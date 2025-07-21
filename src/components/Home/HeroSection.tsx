import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Users, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Turn your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">hustle</span> into a <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">brand</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Promote your skills, earn more, and shine on campus. The leading marketplace for student entrepreneurs across Uganda's top universities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/hustlers"
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-center"
              >
                Browse Hustlers
              </Link>
              <Link
                to="/join"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 text-center"
              >
                Join as Hustler
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">200+</div>
                <div className="text-gray-400 text-sm">Active Hustlers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-gray-400 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src="https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=S"
                      alt="Sarah"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">Sarah Namukasa</div>
                      <div className="text-sm text-gray-300">Hair Braiding</div>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-sm">★★★★★ 4.9</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src="https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=D"
                      alt="David"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">David Okello</div>
                      <div className="text-sm text-gray-300">Web Developer</div>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-sm">★★★★★ 4.8</div>
                </div>
              </div>
              
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src="https://via.placeholder.com/100x100/F97316/FFFFFF?text=G"
                      alt="Grace"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">Grace Atim</div>
                      <div className="text-sm text-gray-300">Custom Cakes</div>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-sm">★★★★★ 5.0</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src="https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=J"
                      alt="Jennifer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">Jennifer Nakato</div>
                      <div className="text-sm text-gray-300">Math Tutor</div>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-sm">★★★★★ 4.9</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 p-3 rounded-full animate-bounce">
              <Star className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-pink-400 text-white p-3 rounded-full animate-pulse">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;