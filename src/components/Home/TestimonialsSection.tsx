import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/mockData';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from students who found amazing services through CampusHustle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-purple-200" />
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.university}</div>
                <div className="text-sm text-purple-600 mt-1">
                  Service by: {testimonial.hustler}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Community</h3>
            <p className="text-gray-600 mb-6">
              Ready to showcase your skills and connect with fellow students? Start your journey today.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;