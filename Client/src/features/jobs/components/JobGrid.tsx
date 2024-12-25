import React from 'react';
import { ViewToggle } from '../../../components/ui/ViewToggle';
import { JobCard } from './JobCard';
import type { Job } from '../types/job';

interface JobGridProps {
  jobs: Job[];
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  onApply: (jobId: string) => void;
}

export const JobGrid: React.FC<JobGridProps> = ({
  jobs,
  view,
  onViewChange,
  onApply,
}) => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <ViewToggle view={view} onViewChange={onViewChange} />
      </div>
      
      <div className={
        view === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 gap-6"
          : "space-y-4"
      }>
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            view={view}
            onApply={() => onApply(job._id)}
          />
        ))}
      </div>
    </div>
  );
};