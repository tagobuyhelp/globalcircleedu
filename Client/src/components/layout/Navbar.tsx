import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Menu, Moon, Sun, Home, BookOpen, 
  Building2, Briefcase, Newspaper 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useThemeStore } from '../../store/themeStore';
import { Logo } from '../ui/Logo';
import { MobileMenu } from './MobileMenu';

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Universities', path: '/universities', icon: Building2 },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'News', path: '/news', icon: Newspaper },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
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
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">
                    <Button variant="outline">Dashboard</Button>
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
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
};