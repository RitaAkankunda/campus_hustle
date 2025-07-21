import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Calendar } from 'lucide-react';
import { Hustler } from '../../types';

interface HustlerCardProps {
  hustler: Hustler;
}

const HustlerCard: React.FC<HustlerCardProps> = ({ hustler }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={hustler.profileImage}
          alt={hustler.name}
          className="w-full h-48 object-cover"
        />
        {hustler.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold">{hustler.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{hustler.name}</h3>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
              {hustler.category}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{hustler.location}, {hustler.university}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Joined {new Date(hustler.joinedDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {hustler.bio}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-500">
            {hustler.reviewCount} reviews
          </div>
          <div className="text-sm font-bold text-purple-600">
            {hustler.pricing}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/hustler/${hustler.id}`}
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium"
          >
            View Profile
          </Link>
          <a
            href={`https://wa.me/${hustler.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-center text-sm font-medium flex items-center justify-center space-x-1"
          >
            <Phone className="h-3 w-3" />
            <span>Chat</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HustlerCard;