import React from 'react';
import { Footer } from './Footer';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {children}
      <Footer />
    </div>
  );
};