import React from 'react';
import { FeatureCard } from './FeatureCard';
import { mapFeatureContent } from '../../../../features/home/utils/mapFeatureContent';
import type { FeaturedContent } from '../../../../features/home/types';

interface FeaturedGridProps {
  content: FeaturedContent;
}

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({ content }) => {
  const features = mapFeatureContent(content);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
};