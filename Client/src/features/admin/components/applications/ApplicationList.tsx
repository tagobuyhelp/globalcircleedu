import React from 'react';
import { ApplicationCard } from './ApplicationCard';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import type { Application } from '../../types/application';

interface ApplicationListProps {
  applications: Application[];
  isLoading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onUpdatePayment: (id: string, status: string, amount: number) => void;
  onViewDetails: (id: string) => void;
}

export const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  isLoading,
  onUpdateStatus,
  onUpdatePayment,
  onViewDetails,
}) => {
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard
          key={application._id}
          application={application}
          onUpdateStatus={onUpdateStatus}
          onUpdatePayment={onUpdatePayment}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};