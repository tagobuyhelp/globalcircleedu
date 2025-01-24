import React from 'react';
import { ApplicationCard } from './ApplicationCard';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import type { Application } from '../../types/application';

interface ApplicationListProps {
  applications: Application[];
  isLoading: boolean;
  onUpdateStatus: (id: string, updates: any) => void;
}

export const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  isLoading,
  onUpdateStatus,
}) => {
  if (isLoading) return <LoadingSpinner />;

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No applications found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {applications.map((application) => (
        <ApplicationCard
          key={application._id}
          application={application}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};