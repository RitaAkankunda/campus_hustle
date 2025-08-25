import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, Clock, Sparkles, Users, Heart, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="text-center lg:text-left text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Shield className="h-5 w-5 text-pink-300 mr-2" />
              <span className="text-pink-200 font-medium">Exclusive for Mary Stuart Hall</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              MSH Connect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-300">
                Your Hall's Marketplace ✨
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-pink-100 mb-10 leading-relaxed">
              Connect with talented ladies at Mary Stuart Hall for all your campus needs. From hair braiding to academic support - your hall entrepreneur has got you covered! 💕
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="h-5 w-5 text-yellow-300 mr-2" />
                <span className="text-white font-medium">4.9★ Rated</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="h-5 w-5 text-green-300 mr-2" />
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
                to="/hustlers"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Browse Entrepreneurs
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <Heart className="mr-2 h-5 w-5" />
                Join as Entrepreneur
              </Link>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              {/* Main illustration container */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  
                  {/* Service Card 1 - Hair & Beauty */}
                  <div className="group bg-white rounded-2xl overflow-hidden transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-xl">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&crop=face" 
                        alt="Hair Braiding Services"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute top-3 right-3 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Popular
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">Hair & Beauty</h3>
                      <p className="text-sm text-gray-600 mb-3">Professional braiding & styling</p>
                      <div className="flex items-center justify-between">
                        <div className="flex text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                        <span className="text-sm font-bold text-pink-600">From UGX 15K</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Card 2 - Food & Treats */}
                  <div className="group bg-white rounded-2xl overflow-hidden transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-xl mt-8">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop" 
                        alt="Snacks and Treats"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Fresh
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">Snacks & Treats</h3>
                      <p className="text-sm text-gray-600 mb-3">Fresh snacks and treats</p>
                      <div className="flex items-center justify-between">
                        <div className="flex text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                        <span className="text-sm font-bold text-orange-600">From UGX 5K</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Card 3 - Academic Support */}
                  <div className="group bg-white rounded-2xl overflow-hidden transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 col-span-2 shadow-xl">
                    <div className="flex">
                      <div className="relative w-1/3 h-24 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop" 
                          alt="Academic Support"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                      </div>
                      <div className="flex-1 p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-1">Academic Support</h3>
                          <p className="text-sm text-gray-600">Tutoring & study groups</p>
                        </div>
                        <div className="text-right">
                          <div className="flex text-yellow-400 mb-1">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                          <span className="text-sm font-bold text-blue-600">From UGX 10K</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Service Cards */}
                  <div className="group bg-white rounded-2xl overflow-hidden transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-xl">
                    <div className="relative h-24 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop" 
                        alt="Accessories & Fashion"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-gray-800 text-sm mb-1">Accessories</h3>
                      <p className="text-xs text-gray-600 mb-2">Totebags & Fashion</p>
                      <div className="flex items-center justify-between">
                        <div className="flex text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                        </div>
                        <span className="text-xs font-bold text-purple-600">From UGX 20K</span>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white rounded-2xl overflow-hidden transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-xl">
                    <div className="relative h-24 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop" 
                        alt="Tech Services"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        New
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-gray-800 text-sm mb-1">Tech & Design</h3>
                      <p className="text-xs text-gray-600 mb-2">Digital Services</p>
                      <div className="flex items-center justify-between">
                        <div className="flex text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                        </div>
                        <span className="text-xs font-bold text-teal-600">From UGX 25K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements with improved styling */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl border-4 border-white/20">
              <Heart className="h-14 w-14 text-white drop-shadow-lg" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl border-4 border-white/20">
              <Sparkles className="h-12 w-12 text-white drop-shadow-lg" />
            </div>
            
            {/* Additional floating elements */}
            <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center animate-ping shadow-xl opacity-80">
              <Star className="h-8 w-8 text-white" />
            </div>
            <div className="absolute top-1/4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg opacity-70" style={{animationDelay: '1s'}}>
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-pink-300 mb-2">50+</div>
            <div className="text-pink-200">Talented Entrepreneurs</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-purple-300 mb-2">500+</div>
            <div className="text-purple-200">Happy Customers</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-yellow-300 mb-2">24/7</div>
            <div className="text-yellow-200">Available Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
