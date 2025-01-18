import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

import { 
  Users, BookOpen, GraduationCap, Briefcase, 
  FileText, Settings, Building2, DollarSign, // Add DollarSign
  MessageSquare, School, Menu, X, LogOut, User
} from 'lucide-react';

import { cn } from '../../utils/cn';

const NavItem = ({ to, icon: Icon, children, isOpen }: { 
  to: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  isOpen: boolean;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
        !isOpen && "justify-center"
      )
    }
  >
    <Icon className={cn("w-5 h-5", isOpen && "mr-3")} />
    {isOpen && <span className="truncate">{children}</span>}
  </NavLink>
);

export const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(true);

  const adminLinks = [
    { to: '/dashboard/admin', icon: Settings, label: 'Dashboard' },
    { to: '/dashboard/admin/users', icon: Users, label: 'Users' },
    { to: '/dashboard/admin/visitors', icon: Users, label: 'Visitors' },
    { to: '/dashboard/admin/courses', icon: BookOpen, label: 'Courses' },
    { to: '/dashboard/admin/services', icon: FileText, label: 'Services' },
    { to: '/dashboard/admin/universities', icon: Building2, label: 'Universities' },
    { to: '/dashboard/admin/degrees', icon: School, label: 'Degrees' },
    { to: '/dashboard/admin/programs', icon: BookOpen, label: 'Programs' },
    { to: '/dashboard/admin/jobs', icon: Briefcase, label: 'Jobs' },
    { to: '/dashboard/admin/applications', icon: FileText, label: 'Applications' },
    { to: '/dashboard/admin/chat', icon: MessageSquare, label: 'Chat' },
    { to: '/dashboard/admin/news', icon: FileText, label: 'News' },
    { to: '/dashboard/admin/stats', icon: Settings, label: 'Statistics' },
    { to: '/dashboard/admin/payments', icon: DollarSign, label: 'Payment History' },
  ];

  const agentLinks = [
    { to: '/dashboard/agent/visitors', icon: Users, label: 'Visitors' },
    { to: '/dashboard/agent/applications', icon: FileText, label: 'Applications' },
    { to: '/dashboard/agent/earnings', icon: DollarSign, label: 'Earnings' },
  ];

  const userLinks = [
    { to: '/dashboard/visitor/profile', icon: User, label: 'Profile' },
  ];

  const links = ['administrator', 'admin', 'editor'].includes(user?.role || '')
    ? adminLinks 
    : user?.role === 'agent'
    ? agentLinks
    : userLinks;

  return (
    <div className={cn(
      "flex-shrink-0 h-screen sticky top-0 transition-all duration-300 ease-in-out",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-4 p-2 -mr-3 bg-white dark:bg-gray-800 rounded-full shadow-lg transform translate-x-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        <nav className={cn(
          "flex-1 bg-white dark:bg-gray-800 border-r dark:border-gray-700",
          "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",
          isOpen ? "px-4" : "px-2"
        )}>
          <div className="space-y-1 py-4">
            {links.map((link) => (
              <NavItem 
                key={link.to} 
                to={link.to} 
                icon={link.icon}
                isOpen={isOpen}
              >
                {link.label}
              </NavItem>
            ))}
          </div>
        </nav>

        {/* User Profile and Logout Footer */}
        <div className={cn(
          "border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
          "p-4",
          !isOpen && "p-2"
        )}>
          <div className={cn(
            "flex items-center",
            !isOpen && "justify-center"
          )}>
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            {isOpen && (
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={logout}
            className={cn(
              "mt-4 w-full flex items-center text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
              "rounded-lg p-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
              !isOpen && "justify-center"
            )}
          >
            <LogOut className="w-4 h-4" />
            {isOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
