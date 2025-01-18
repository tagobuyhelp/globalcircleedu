// src/features/admin/components/applications/ApplicationCard.tsx
import React from 'react';
import { Card } from '../../../../components/ui/Card';
import { ServiceCard } from './ServiceCard';
import type { Application } from '../../types/application';

interface ApplicationCardProps {
  application: Application;
  onUpdateService: (serviceId: string, updates: any) => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onUpdateService,
}) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            Application for {application.visitorId.name}
          </h3>
          {application.agentId && (
            <p className="text-sm text-gray-600">Agent: {application.agentId.name}</p>
          )}
        </div>
        <div className="text-right">
          <p className="font-medium">Total Due: ${application.totalServiceFeesDue}</p>
          <p className="text-sm text-gray-600">Paid: ${application.totalAmountPaid}</p>
        </div>
      </div>

      <div className="space-y-4">
        {application.services.map((service) => (
          <ServiceCard
            key={service.serviceId._id}
            service={service}
            onUpdateStatus={(updates) => onUpdateService(service.serviceId._id, updates)}
          />
        ))}
      </div>

      {application.adminNotes && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">{application.adminNotes}</p>
        </div>
      )}
    </Card>
  );
};
