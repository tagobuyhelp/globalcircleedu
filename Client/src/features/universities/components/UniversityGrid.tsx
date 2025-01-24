import React from 'react';
import { ViewToggle } from '../../../components/ui/ViewToggle';
import { UniversityCard } from './UniversityCard';
import type { University } from '../types/university';

interface UniversityGridProps {
  universities: University[];
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  onSelect: (id: string) => void;
}

export const UniversityGrid: React.FC<UniversityGridProps> = ({
  universities,
  view,
  onViewChange,
  onSelect,
}) => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <ViewToggle view={view} onViewChange={onViewChange} />
      </div>
      
      <div className={
        view === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {universities.map((university) => (
          <UniversityCard
            key={university._id}
            university={university}
            onViewDetails={onSelect}
          />
        ))}
      </div>
    </div>
  );
};