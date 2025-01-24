import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { Logo } from '../ui/Logo';

export const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    
    // Handle admin roles consistently
    if (user.role === 'admin' || user.role === 'administrator') {
      return '/dashboard/admin';
    }
    
    switch (user.role) {
      case 'agent':
        return '/dashboard/agent';
      case 'visitor':
        return '/dashboard/visitor/profile';
      default:
        return '/dashboard/visitor/profile';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              Courses
            </Link>
            <Link to="/universities" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              Universities
            </Link>
            <Link to="/study-abroad" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              Study Abroad
            </Link>
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              Jobs
            </Link>
            <Link to="/news" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              News
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={getDashboardLink()}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
                >
                  {user?.role === 'visitor' ? 'My Profile' : 'Dashboard'}
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};