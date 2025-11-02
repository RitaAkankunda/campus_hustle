import React, { useState } from 'react';
import usePWAInstallPrompt from '../../hooks/usePWAInstallPrompt';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'MSH Entrepreneurs', href: '/hustlers' },
    { name: 'Services', href: '/categories' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const { isSupported, promptInstall } = usePWAInstallPrompt();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 rounded-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                MSH Connect
              </span>
              <span className="text-xs text-gray-500">Mary Stuart Hall</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/favorites"
              className="relative text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
              title="My Favorites"
            >
              <Heart className={`h-5 w-5 ${favorites.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 font-medium"
            >
              Join the Community
            </Link>
            {isSupported && (
              <button
                onClick={promptInstall}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
                title="Install as App"
              >
                Install App
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className="relative text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors text-center flex items-center justify-center gap-2"
              >
                <Heart className={`h-5 w-5 ${favorites.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 font-medium text-center"
              >
                Join the Community
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;