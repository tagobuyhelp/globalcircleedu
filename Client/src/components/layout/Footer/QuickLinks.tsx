import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const QuickLinks = () => {
  const links = [
    { label: 'Courses', path: '/courses' },
    { label: 'Universities', path: '/universities' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'News', path: '/news' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQs', path: '/faqs' }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold relative mb-6">
        <span className="relative">
          Quick Links
          <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#f37021]"></span>
        </span>
      </h3>
      
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link 
              to={link.path} 
              className="flex items-center group text-gray-300 hover:text-[#f37021] transition-colors"
            >
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};