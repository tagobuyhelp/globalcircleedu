// src/features/admin/components/ApplicationCard.tsx
import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useState } from 'react';
import { PaymentForm } from '../../../../components/payment/PaymentForm';
import type { Application } from '../types';

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onUpdateService,
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedService, setSelectedService] = useState<ApplicationService | null>(null);

  const handlePaymentSuccess = async () => {
    if (selectedService) {
      await onUpdateService(selectedService.serviceId._id, {
        paymentStatus: 'Completed'
      });
    }
    setShowPayment(false);
    setSelectedService(null);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{application.serviceId.name}</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p>Agent: {application.agentId.name}</p>
            <p>Visitor: {application.visitorId.name}</p>
            <p>Amount Paid: ${application.amountPaid}</p>
            <p>Commission: ${application.commissionAmount}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <select
              value={application.status}
              onChange={(e) => onUpdateStatus(application._id, { status: e.target.value })}
              className="rounded-lg border p-2"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={application.paymentStatus}
              onChange={(e) => onUpdateStatus(application._id, { paymentStatus: e.target.value })}
              className="rounded-lg border p-2"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end">
        {application.services.map((service) => (
          service.paymentStatus !== 'Completed' && (
            <Button
              key={service.serviceId._id}
              onClick={() => {
                setSelectedService(service);
                setShowPayment(true);
              }}
              className="ml-2"
            >
              Pay for {service.serviceId.name}
            </Button>
          )
        ))}
      </div>

      {/* Payment Modal */}
      {showPayment && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <PaymentForm
              amount={selectedService.serviceId.fees.reduce((sum, fee) => 
                sum + (fee.isOptional ? 0 : fee.amount), 0) - selectedService.amountPaid}
              serviceId={selectedService.serviceId._id}
              onSuccess={handlePaymentSuccess}
              onCancel={() => {
                setShowPayment(false);
                setSelectedService(null);
              }}
            />
        </div>
      </div>
    </Card>
  );
};
