import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 rounded-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">MSH Connect</span>
                <span className="text-xs text-gray-400">Mary Stuart Hall</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting the amazing ladies of Mary Stuart Hall. Discover talented entrepreneurs offering 
              exceptional services right in your hall. Building a community through business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/hustlers" className="text-gray-400 hover:text-white transition-colors">MSH Entrepreneurs</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Hall Blog</Link></li>
              <li><Link to="/join" className="text-gray-400 hover:text-white transition-colors">Join the Community</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">mshconnect@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">0780597659</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Mary Stuart Hall, Makerere University</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 MSH Connect. All rights reserved. Built with 💕 for Mary Stuart Hall entrepreneurs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
