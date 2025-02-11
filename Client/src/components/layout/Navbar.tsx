import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Menu, Home, BookOpen, 
  Building2, Briefcase, Newspaper, Settings,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { MobileMenu } from './MobileMenu';

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountriesMenuOpen, setIsCountriesMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Universities', path: '/universities', icon: Building2 },
    { 
      label: 'Study Destinations', 
      path: '#',
      icon: Globe,
      children: [
        { label: 'France', path: '/study/france' },
        { label: 'Spain', path: '/study/spain' },
        { label: 'Portugal', path: '/study/portugal' },
        { label: 'Ireland', path: '/study/ireland' },
        { label: 'Poland', path: '/study/poland' },
        { label: 'Italy', path: '/study/italy' },
        { label: 'Czech Republic', path: '/study/czech-republic' },
        { label: 'Slovenia', path: '/study/slovenia' },
        { label: 'Sweden', path: '/study/sweden' },
        { label: 'Denmark', path: '/study/denmark' },
        { label: 'Cyprus', path: '/study/cyprus' }
      ]
    },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'News', path: '/news', icon: Newspaper },
    { label: 'Services', path: '/services', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-start max-w-[200px] ">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.children) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                        isCountriesMenuOpen
                          ? 'text-[#004e9a] bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-600 hover:text-[#004e9a] dark:text-gray-300 dark:hover:text-blue-400'
                      }`}
                      onClick={() => setIsCountriesMenuOpen(!isCountriesMenuOpen)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                    {isCountriesMenuOpen && (
                      <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => setIsCountriesMenuOpen(false)}
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
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                    isActive(item.path)
                      ? 'text-[#004e9a] bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-600 hover:text-[#004e9a] dark:text-gray-300 dark:hover:text-blue-400'
                  }`}
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
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
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