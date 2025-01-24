import React from 'react';
import { FeaturedGrid } from './FeaturedGrid';
import type { FeaturedContent as FeaturedContentType } from '../../../../features/home/types';

interface FeaturedContentProps {
  content: FeaturedContentType | null;
  loading: boolean;
  error: string | null;
}

export const FeaturedContent: React.FC<FeaturedContentProps> = ({
  content,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error || !content) {
    return null;
  }

  return <FeaturedGrid content={content} />;
};