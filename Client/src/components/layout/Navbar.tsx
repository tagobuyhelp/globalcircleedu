import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Menu, Home, Briefcase, Newspaper, Settings,
  Globe, ChevronDown, ChevronRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { MobileMenu } from './MobileMenu';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountriesMenuOpen, setIsCountriesMenuOpen] = useState(false);
  const [isCountriesHovered, setIsCountriesHovered] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { 
      label: 'Study Destinations', 
      path: '#',
      icon: Globe,
      children: [
        // Western Europe
        { label: 'France', path: '/study/france' },
        { label: 'Spain', path: '/study/spain' },
        { label: 'Portugal', path: '/study/portugal' },
        { label: 'Ireland', path: '/study/ireland' },
        { label: 'Italy', path: '/study/italy' },
        { label: 'Norway', path: '/study/norway' },
        
        // Central Europe
        { label: 'Czech Republic', path: '/study/czech' },
        { label: 'Poland', path: '/study/poland' },
        { label: 'Slovenia', path: '/study/slovenia' },
        { label: 'Slovakia', path: '/study/slovakia' },
        { label: 'Bosnia and Herzegovina', path: '/study/bosnia' },
        
        // Northern Europe
        { label: 'Sweden', path: '/study/sweden' },
        { label: 'Denmark', path: '/study/denmark' },
        { label: 'Latvia', path: '/study/latvia' },
        { label: 'Lithuania', path: '/study/lithuania' },
        { label: 'Estonia', path: '/study/estonia' },
        
        // Southern Europe
        { label: 'Greece', path: '/study/greece' },
        { label: 'Croatia', path: '/study/croatia' },
        { label: 'Malta', path: '/study/malta' },
        { label: 'Cyprus', path: '/study/cyprus' },
        
        // Eastern Europe
        { label: 'Belarus', path: '/study/belarus' },
        { label: 'Georgia', path: '/study/georgia' },
        
        // Other Regions
        { label: 'Australia', path: '/study/australia' },
        { label: 'United Arab Emirates', path: '/study/united%20arab%20emirates' }
      ]
    },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'News', path: '/news', icon: Newspaper },
    { label: 'Services', path: '/services', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.children) {
                return (
                  <div 
                    key={item.label} 
                    className="relative"
                    onMouseEnter={() => setIsCountriesHovered(true)}
                    onMouseLeave={() => setIsCountriesHovered(false)}
                  >
                    <button
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2",
                        isCountriesHovered
                          ? "text-[#004e9a] bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                          : "text-gray-600 hover:text-[#004e9a] dark:text-gray-300 dark:hover:text-blue-400"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    {isCountriesHovered && (
                      <div className="absolute left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-1 max-h-[70vh] overflow-y-auto">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2",
                    isActive(item.path)
                      ? "text-[#004e9a] bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-600 hover:text-[#004e9a] dark:text-gray-300 dark:hover:text-blue-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.role === 'visitor' ? '/dashboard/visitor/profile' : '/dashboard'}
                  className="text-gray-600 hover:text-[#004e9a] dark:text-gray-300"
                >
                  {user?.role === 'visitor' ? 'My Profile' : 'Dashboard'}
                </Link>
                <Button onClick={logout}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-[#004e9a]/10 hover:bg-[#004e9a]/20 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-[#004e9a]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </nav>
  );
};