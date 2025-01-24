import React from 'react';
import { WorldMap } from '../WorldMap';

export const GlobalPresenceSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Global Presence
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our growing network of students and universities worldwide
          </p>
        </div>
        <WorldMap />
      </div>
    </section>
  );
};