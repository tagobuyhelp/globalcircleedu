import React from 'react';

export const LoadingState = () => {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      ))}
    </div>
  );
};