// src/components/layout/MobileMenu.tsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, ChevronRight, Moon, Sun, 
  UserCircle, LogOut, LayoutDashboard, 
  LogIn, UserPlus 
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; path: string; icon: React.ElementType }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
}) => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    
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
    <div
      className={cn(
        'fixed inset-0 z-50 transform transition-all duration-500 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Backdrop with blur effect */}
      <div 
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Menu Content */}
      <div 
        className={cn(
          'absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-800 shadow-xl',
          'transform transition-transform duration-500 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "hover:bg-gray-100 dark:hover:bg-gray-700",
                      isActive && "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    )}
                    onClick={onClose}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={cn(
                        "h-5 w-5",
                        isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
                      )} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={cn(
                      "h-4 w-4 transition-transform",
                      isActive ? "text-blue-600 dark:text-blue-400 translate-x-1" : "text-gray-400"
                    )} />
                  </Link>
                );
              })}
            </nav>

            <div className="border-t my-4 dark:border-gray-700" />

            {/* Theme Toggle */}
            <div className="px-4">
              <button
                onClick={() => {
                  toggleTheme();
                  onClose();
                }}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-slate-900 dark:text-slate-100" />
                  )}
                  <span>Theme</span>
                </div>
                <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 rounded-full relative transition-colors">
                  <div className={cn(
                    "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                    isDarkMode && "translate-x-4"
                  )} />
                </div>
              </button>
            </div>
          </div>

          {/* Auth Section */}
          <div className="p-4 border-t dark:border-gray-700">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 px-3">
                  <UserCircle className="h-8 w-8 text-gray-400" />
                  <div className="text-sm">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to={getDashboardLink()}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2"
                      onClick={onClose}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>{user?.role === 'visitor' ? 'My Profile' : 'Dashboard'}</span>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                    onClick={onClose}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className="w-full flex items-center justify-center space-x-2 bg-[#004e9a] hover:bg-[#003d7a] text-white" 
                    onClick={onClose}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
