import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover world-class education opportunities and career paths
          </p>
        </div>

        <StatsGrid />
        <CTAButtons />

        {/* Section Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Featured Courses', path: '/courses', color: 'blue' },
            { title: 'Top Universities', path: '/universities', color: 'indigo' },
            { title: 'Latest Jobs', path: '/jobs', color: 'emerald' },
            { title: 'Recent News', path: '/news', color: 'violet' }
          ].map((section) => (
            <Link 
              key={section.path}
              to={section.path}
              className={`group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-${section.color}-100 dark:border-${section.color}-900/20`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold text-${section.color}-600 dark:text-${section.color}-400`}>
                  {section.title}
                </h3>
                <ArrowRight className={`w-5 h-5 text-${section.color}-600 dark:text-${section.color}-400 transform group-hover:translate-x-1 transition-transform`} />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                View all {section.title.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>

        {loading ? (
          <LoadingState />
        ) : content && !error ? (
          <FeaturedGrid content={content} />
        ) : null}
      </div>
    </section>
  );
};