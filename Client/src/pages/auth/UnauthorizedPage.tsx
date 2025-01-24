import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Access Denied
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          You don't have permission to access this page.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};