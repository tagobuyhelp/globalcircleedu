import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MapPin, Building2, DollarSign } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>
        <Button onClick={() => onApply?.(job.id)}>Apply Now</Button>
      </div>
      
      <p className="mt-4 text-gray-600 dark:text-gray-400">{job.description}</p>
      
      {job.requirements.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Requirements:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};