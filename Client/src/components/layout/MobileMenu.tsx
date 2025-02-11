import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, ChevronRight, UserCircle, LogOut, 
  LayoutDashboard, LogIn, UserPlus, MessageSquare,
  ChevronDown 
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useChat } from '../../features/chat/hooks/useChat';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{
    label: string;
    path: string;
    icon: React.ElementType;
    children?: Array<{ label: string; path: string }>;
  }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
}) => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { openChat } = useChat();
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

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
        'fixed inset-0 z-50 transform transition-all duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Backdrop with blur effect */}
      <div 
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Menu Content */}
      <div 
        className={cn(
          'absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-800 shadow-xl',
          'transform transition-transform duration-300 ease-out',
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
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Profile Section */}
          {isAuthenticated && (
            <div className="p-4 bg-gradient-to-r from-[#004e9a] to-[#f37021] text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <UserCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-medium">{user?.name}</h3>
                  <p className="text-sm text-white/80">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const isExpanded = expandedItem === item.label;

                if (item.children) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          "hover:bg-gray-100 dark:hover:bg-gray-700",
                          isExpanded && "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={cn(
                            "h-5 w-5",
                            isExpanded ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
                          )} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )} />
                      </button>
                      {isExpanded && (
                        <div className="mt-2 ml-6 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          ))}
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

            {/* Chat Support */}
            {isAuthenticated && (
              <div className="px-4 mt-4">
                <button
                  onClick={() => {
                    openChat(user.id);
                    onClose();
                  }}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Live Chat Support</span>
                </button>
              </div>
            )}
          </div>

          {/* Auth Actions */}
          <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            {isAuthenticated ? (
              <div className="space-y-3">
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
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                    onClick={onClose}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
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