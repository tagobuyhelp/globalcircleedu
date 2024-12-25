import React from 'react';
import { StatsGrid } from './components/StatsGrid';
import { CTAButtons } from './components/CTAButtons';
import { FeaturedGrid } from './components/FeaturedGrid';
import { LoadingState } from './components/LoadingState';
import { useFeaturedContent } from '../../../features/home/hooks/useFeaturedContent';

export const FeaturedSection = () => {
  const { content, loading, error } = useFeaturedContent();

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatsGrid />
        <CTAButtons />
        {loading ? (
          <LoadingState />
        ) : content && !error ? (
          <FeaturedGrid content={content} />
        ) : null}
      </div>
    </section>
  );
};