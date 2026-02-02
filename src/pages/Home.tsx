import React from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/Home/HeroSection';
import CategoriesSection from '../components/Home/CategoriesSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';

const Home: React.FC = () => {
  return (
    <div>
      <SEO 
        title="Campus Hustle - Mary Stuart Hall Marketplace | Connect with Student Entrepreneurs"
        description="Discover amazing services from talented entrepreneurs at Mary Stuart Hall, Makerere University. From hair braiding to tech solutions - your hall community has it all!"
        keywords="Mary Stuart Hall, Makerere University, student entrepreneurs, campus marketplace, hair braiding, tech services, academic support, MSH, Uganda students"
        url="https://campushustle.com"
      />
      <HeroSection />
      
      {/* Trust Indicators Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Makerere Students</h2>
            <p className="text-gray-600">Join thousands of successful student entrepreneurs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl font-bold py-4 px-6 rounded-xl mb-2">
                500+
              </div>
              <p className="text-gray-600 font-medium">Active Entrepreneurs</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-3xl font-bold py-4 px-6 rounded-xl mb-2">
                10K+
              </div>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-3xl font-bold py-4 px-6 rounded-xl mb-2">
                4.9★
              </div>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-3xl font-bold py-4 px-6 rounded-xl mb-2">
                99%
              </div>
              <p className="text-gray-600 font-medium">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-200/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Campus Hustle Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect with talented student entrepreneurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Browse & Discover</h3>
              <p className="text-gray-600">
                Explore hundreds of talented student entrepreneurs across different categories and services
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect & Chat</h3>
              <p className="text-gray-600">
                Contact entrepreneurs directly through WhatsApp, phone, or email to discuss your needs
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Amazing Service</h3>
              <p className="text-gray-600">
                Receive high-quality services from fellow students at affordable, student-friendly prices
              </p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Entrepreneurial Journey?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Join thousands of successful student entrepreneurs who are already earning and building their brands on campus. Explore the opportunities waiting for you at Mary Stuart Hall!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-teal-400">🚀</div>
              <h3 className="font-semibold mb-2">Launch Your Business</h3>
              <p className="text-blue-200 text-sm">Turn your skills into a profitable campus business</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-400">💰</div>
              <h3 className="font-semibold mb-2">Earn Real Money</h3>
              <p className="text-blue-200 text-sm">Generate income while studying and building your future</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-400">🤝</div>
              <h3 className="font-semibold mb-2">Build Your Network</h3>
              <p className="text-blue-200 text-sm">Connect with fellow entrepreneurs and potential customers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;