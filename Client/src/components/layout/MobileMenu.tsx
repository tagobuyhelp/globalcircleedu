import React from 'react';
import { Link } from 'react-router-dom';
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
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Menu Content */}
      <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onClose}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                );
              })}
            </nav>

            <div className="border-t my-4" />

            {/* Theme Toggle */}
            <div className="px-4">
              <button
                onClick={() => {
                  toggleTheme();
                  onClose();
                }}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center space-x-3">
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  <span>Theme</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Auth Section */}
          <div className="p-4 border-t">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 px-3">
                  <UserCircle className="h-8 w-8 text-gray-400" />
                  <div className="text-sm">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/dashboard">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2"
                      onClick={onClose}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center space-x-2"
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
                    className="w-full flex items-center justify-center space-x-2" 
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