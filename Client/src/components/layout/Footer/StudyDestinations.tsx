import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin } from 'lucide-react';

export const StudyDestinations = () => {
  const destinations = [
    { name: 'USA', path: '/study/usa', featured: true },
    { name: 'UK', path: '/study/uk', featured: true },
    { name: 'UAE', path: '/study/uae', featured: true },
    { name: 'Canada', path: '/study/canada', featured: true },
    { name: 'Australia', path: '/study/australia' },
    { name: 'New Zealand', path: '/study/new-zealand' },
    { name: 'Germany', path: '/study/germany' },
    { name: 'France', path: '/study/france' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold relative mb-6">
        <span className="relative">
          Study Destinations
          <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#f37021]"></span>
        </span>
      </h3>

      {/* Featured Destinations */}
      <div className="grid grid-cols-2 gap-4">
        {destinations.filter(d => d.featured).map((destination) => (
          <Link
            key={destination.path}
            to={destination.path}
            className="flex items-center p-2 bg-gray-800 rounded-lg hover:bg-[#f37021]/10 transition-colors group"
          >
            <MapPin className="w-4 h-4 mr-2 text-[#f37021] group-hover:scale-110 transition-transform" />
            <span className="text-gray-300 group-hover:text-[#f37021] transition-colors">
              {destination.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Other Destinations */}
      <div className="space-y-2">
        <div className="flex items-center text-sm text-[#f37021]">
          <Globe className="w-4 h-4 mr-2" />
          <span>More Destinations</span>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
          {destinations.filter(d => !d.featured).map((destination) => (
            <li key={destination.path}>
              <Link
                to={destination.path}
                className="text-gray-300 hover:text-[#f37021] transition-colors text-sm"
              >
                {destination.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};