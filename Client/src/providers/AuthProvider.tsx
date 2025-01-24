import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  useAuth(); // Initialize auth listener
  return <>{children}</>;
};