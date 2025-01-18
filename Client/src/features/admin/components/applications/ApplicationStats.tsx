// src/features/admin/components/applications/ApplicationStats.tsx
import React from 'react';
import { Card } from '../../../../components/ui/Card';
import type { ApplicationStats } from '../../types/application';

interface ApplicationStatsProps {
  stats: ApplicationStats;
}

export const ApplicationStats: React.FC<ApplicationStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card className="p-4">
        <h3 className="font-medium text-gray-600">Applications</h3>
        <p className="text-2xl font-bold">{stats.serviceStats.totalApplications}</p>
        <div className="mt-2 text-sm">
          <p>Pending: {stats.serviceStats.pendingServices}</p>
          <p>Approved: {stats.serviceStats.approvedApplications}</p>
          <p>Rejected: {stats.serviceStats.rejectedApplications}</p>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium text-gray-600">Total Fees Due</h3>
        <p className="text-2xl font-bold">
          ${stats.additionalStats.totalServiceFeesDue.toLocaleString()}
        </p>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium text-gray-600">Amount Paid</h3>
        <p className="text-2xl font-bold">
          ${stats.additionalStats.totalAmountPaid.toLocaleString()}
        </p>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium text-gray-600">Total Commission</h3>
        <p className="text-2xl font-bold">
          ${stats.additionalStats.totalCommissionAmount.toLocaleString()}
        </p>
      </Card>
    </div>
  );
};
