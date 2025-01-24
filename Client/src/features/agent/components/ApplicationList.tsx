// src/features/agent/components/ApplicationList.tsx
import React from 'react';
import { Card } from '../../../components/ui/Card';
import type { Application } from '../types';

interface ApplicationListProps {
  applications: Application[];
}

export const ApplicationList: React.FC<ApplicationListProps> = ({ applications }) => {
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application._id} className="p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{application.serviceId.name}</h3>
              <p className="text-sm text-gray-600">
                Visitor: {application.visitorId.name}
              </p>
              <p className="text-sm text-gray-600">
                Commission: ${application.commissionAmount}
              </p>
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {application.status}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
