import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, Clock, Sparkles, Users, Heart, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="text-center lg:text-left text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Shield className="h-5 w-5 text-blue-300 mr-2" />
              <span className="text-blue-200 font-medium">Exclusive for Mary Stuart Hall</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              MSH Connect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">
                Your Hall's Marketplace ✨
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
              Connect with talented ladies at Mary Stuart Hall for all your campus needs. From hair braiding to academic support - your hall entrepreneur has got you covered! 💕
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="h-5 w-5 text-yellow-300 mr-2" />
                <span className="text-white font-medium">4.9★ Rated</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="h-5 w-5 text-teal-300 mr-2" />
                <span className="text-white font-medium">50+ Ladies</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-5 w-5 text-blue-300 mr-2" />
                <span className="text-white font-medium">24/7 Available</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <Heart className="mr-3 h-6 w-6" />
                Join Our Community
                <ArrowRight className="ml-3 h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/hustlers"
                className="group inline-flex items-center px-8 py-5 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                <Sparkles className="mr-3 h-5 w-5" />
                Browse Entrepreneurs
              </Link>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              {/* Main illustration container */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  
                  {/* Service Card 1 */}
                  <div className="bg-white rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Hair & Beauty</h3>
                    <p className="text-sm text-gray-600">Professional braiding & styling</p>
                    <div className="flex items-center mt-3">
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <span className="text-xs text-gray-500 ml-2">5.0</span>
                    </div>
                  </div>

                  {/* Service Card 2 */}
                  <div className="bg-white rounded-2xl p-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300 mt-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Food & Treats</h3>
                    <p className="text-sm text-gray-600">Fresh snacks and treats</p>
                    <div className="flex items-center mt-3">
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <span className="text-xs text-gray-500 ml-2">4.9</span>
                    </div>
                  </div>

                  {/* Service Card 3 */}
                  <div className="bg-white rounded-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300 col-span-2">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">Academic Support</h3>
                        <p className="text-sm text-gray-600">Tutoring & study groups</p>
                      </div>
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
              <Heart className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-blue-300 mb-2">50+</div>
            <div className="text-blue-200">Talented Entrepreneurs</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-purple-300 mb-2">500+</div>
            <div className="text-purple-200">Happy Customers</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-teal-300 mb-2">24/7</div>
            <div className="text-teal-200">Available Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
