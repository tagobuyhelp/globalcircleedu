import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Users, BookOpen, GraduationCap, Briefcase, 
  FileText, Settings, Building2, DollarSign 
} from 'lucide-react';

const NavItem = ({ to, icon: Icon, children }: { 
  to: string; 
  icon: React.ElementType; 
  children: React.ReactNode; 
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
      }`
    }
  >
    <Icon className="w-5 h-5 mr-3" />
    {children}
  </NavLink>
);

export const Sidebar = () => {
  const { user } = useAuthStore();

  const adminLinks = [
    { to: '/dashboard/admin/users', icon: Users, label: 'Users' },
    { to: '/dashboard/admin/services', icon: FileText, label: 'Services' },
    { to: '/dashboard/admin/universities', icon: Building2, label: 'Universities' },
    { to: '/dashboard/admin/applications', icon: FileText, label: 'Applications' },
  ];

  const agentLinks = [
    { to: '/dashboard/agent/visitors', icon: Users, label: 'Visitors' },
    { to: '/dashboard/agent/applications', icon: FileText, label: 'Applications' },
    { to: '/dashboard/agent/earnings', icon: DollarSign, label: 'Earnings' },
  ];

  const userLinks = [
    { to: '/dashboard/user/courses', icon: BookOpen, label: 'Courses' },
    { to: '/dashboard/user/universities', icon: GraduationCap, label: 'Universities' },
    { to: '/dashboard/user/jobs', icon: Briefcase, label: 'Jobs' },
    { to: '/dashboard/user/applications', icon: FileText, label: 'Applications' },
  ];

  const links = user?.role === 'admin' 
    ? adminLinks 
    : user?.role === 'agent'
    ? agentLinks
    : userLinks;

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <nav className="mt-5 px-2 space-y-1">
        {links.map((link) => (
          <NavItem key={link.to} to={link.to} icon={link.icon}>
            {link.label}
          </NavItem>
        ))}
      </nav>
    </div>
  );
};