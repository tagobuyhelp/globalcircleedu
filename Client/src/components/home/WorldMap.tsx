import React from 'react';
import { WorldMapAdvanced } from '../map/WorldMapAdvanced';

export const WorldMap = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WorldMapAdvanced />
      </div>
    </section>
  );
};