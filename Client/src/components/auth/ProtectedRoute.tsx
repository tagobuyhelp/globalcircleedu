import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Map administrator role to admin for consistency
  const userRole = user.role === 'administrator' ? 'admin' : user.role;

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole as UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};