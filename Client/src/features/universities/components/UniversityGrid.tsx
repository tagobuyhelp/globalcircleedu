import React from 'react';
import { UniversityCard } from './UniversityCard';
import type { University } from '../types/university';

interface UniversityGridProps {
  universities: University[];
  onSelect: (id: string) => void;
}

export const UniversityGrid: React.FC<UniversityGridProps> = ({
  universities,
  onSelect,
}) => {
  return (
    <div className="space-y-6">
      {universities.map((university) => (
        <UniversityCard
          key={university._id}
          university={university}
          onViewDetails={onSelect}
        />
      ))}
    </div>
  );
};