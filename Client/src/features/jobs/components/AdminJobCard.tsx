// src/features/jobs/components/AdminJobCard.tsx
import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Pencil, Trash2, Building2, MapPin, Calendar, Tag } from 'lucide-react';
import type { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {job.jobType}
            </span>
          </div>

          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{job.company}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}, {job.country}</span>
            </div>

            {job.applicationDeadline && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Tag className="w-4 h-4 mr-2" />
              <span>{job.salary}</span>
            </div>
          </div>

          {job.requirements?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Requirements:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <li key={index} className="truncate">{req}</li>
                ))}
                {job.requirements.length > 3 && (
                  <li className="text-blue-600 dark:text-blue-400">
                    +{job.requirements.length - 3} more
                  </li>
                )}
              </ul>
            </div>
          )}

          {job.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="ml-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(job)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:bg-red-50"
            onClick={() => onDelete(job._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
