import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center">
      {/* Mobile-optimized header */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center justify-center sm:justify-center space-x-2">
          <GraduationCap className="h-10 w-10 text-[#004e9a]" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Global Circle Edu</span>
        </Link>
      </div>

      <div className=" flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-3 text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};