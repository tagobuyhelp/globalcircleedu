// src/features/admin/components/ApplicationList.tsx
import React from 'react';
import { ApplicationCard } from './ApplicationCard';
import type { Application } from '../types';

interface ApplicationListProps {
  applications: Application[];
  onUpdateStatus: (id: string, updates: any) => void;
}

export const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  onUpdateStatus,
}) => {
  return (
    <div className="space-y-4">
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
