import React, { useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { PaymentForm } from '../../../../components/payment/PaymentForm';
import type { ApplicationService } from '../../types/application';

interface ServiceCardProps {
  service: ApplicationService;
  onUpdateStatus: (updates: Partial<ApplicationService>) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onUpdateStatus }) => {
  const [showPayment, setShowPayment] = useState(false);
  const totalFees = service.serviceId.fees.reduce((sum, fee) => 
    sum + (fee.isOptional ? 0 : fee.amount), 0);
  const remainingAmount = totalFees - service.amountPaid;

  const handlePaymentSuccess = () => {
    onUpdateStatus({ paymentStatus: 'Completed' });
    setShowPayment(false);
  };

  return (
    <>
      <Card className="p-4">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{service.serviceId.name}</h4>
            <div className="mt-2 space-y-1 text-sm">
              <p>Total Fees: ${totalFees}</p>
              <p>Amount Paid: ${service.amountPaid}</p>
              {remainingAmount > 0 && (
                <p className="text-red-600">Remaining: ${remainingAmount}</p>
              )}
              <p>Commission: ${service.commissionAmount}</p>
            </div>
          </div>
          <div className="space-y-2">
            <select
              value={service.status}
              onChange={(e) => onUpdateStatus({ status: e.target.value as any })}
              className="block w-full rounded-lg border p-2"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            <div className={`px-3 py-1 rounded-full text-sm text-center ${
              service.paymentStatus === 'Completed' 
                ? 'bg-green-100 text-green-800' 
                : service.paymentStatus === 'Partial'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {service.paymentStatus}
            </div>

            {remainingAmount > 0 && (
              <Button 
                onClick={() => setShowPayment(true)}
                className="w-full"
              >
                Make Payment
              </Button>
            )}
          </div>
        </div>
      </Card>

      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <PaymentForm
              amount={remainingAmount}
              serviceId={service.serviceId._id}
              onSuccess={handlePaymentSuccess}
              onCancel={() => setShowPayment(false)}
              isAdmin={true}
            />
          </div>
        </div>
      )}
    </>
  );
};