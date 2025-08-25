import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/cleanMockData';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What MSH Entrepreneurs Say 💕
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from Mary Stuart Hall ladies who found amazing services from their hall entrepreneurs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl hover:bg-white/80 transition-all duration-300 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-blue-200" />
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">Mary Stuart Hall, Makerere University</div>
                <div className="text-xs text-gray-400 mt-2">
                  Service by: {testimonial.hustler} (MSH Entrepreneur)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;