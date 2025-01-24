import React, { useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { ServiceCard } from './ServiceCard';
import { PaymentForm } from '../../../../components/payment/PaymentForm';
import type { Application } from '../../types/application';

interface ApplicationCardProps {
  application: Application;
  onUpdateStatus: (id: string, updates: any) => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onUpdateStatus,
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleServiceUpdate = (serviceId: string, updates: any) => {
    const updatedServices = application.services.map(service => 
      service.serviceId._id === serviceId 
        ? { ...service, ...updates }
        : service
    );

    onUpdateStatus(application._id, { services: updatedServices });
  };

  const calculateRemainingAmount = (service: any) => {
    const totalFees = service.serviceId.fees.reduce((sum: number, fee: any) => 
      sum + (fee.isOptional ? 0 : fee.amount), 0);
    return Math.max(0, totalFees - (service.amountPaid || 0));
  };

  const handlePaymentSuccess = (serviceId: string) => {
    handleServiceUpdate(serviceId, { paymentStatus: 'Completed' });
    setShowPayment(false);
    setSelectedService(null);
  };

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
          <p className="font-medium">Total Due: ₹{application.totalAmountPaid?.toLocaleString() || '0'}</p>
          <p className="text-sm text-gray-600">Commission: ₹{application.totalCommissionAmount?.toLocaleString() || '0'}</p>
        </div>
      </div>

      <div className="space-y-4">
        {application.services.map((service) => (
          <div key={service.serviceId._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium">{service.serviceId.name}</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Amount Paid: ₹{service.amountPaid?.toLocaleString() || '0'}</p>
                  <p>Commission: ₹{service.commissionAmount?.toLocaleString() || '0'}</p>
                  {calculateRemainingAmount(service) > 0 && (
                    <p className="text-red-600">
                      Remaining: ₹{calculateRemainingAmount(service).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <select
                  value={service.status}
                  onChange={(e) => handleServiceUpdate(service.serviceId._id, { status: e.target.value })}
                  className="block w-full rounded-lg border p-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
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

                {service.paymentStatus !== 'Completed' && calculateRemainingAmount(service) > 0 && (
                  <Button
                    onClick={() => {
                      setSelectedService(service);
                      setShowPayment(true);
                    }}
                    className="w-full"
                  >
                    Pay ₹{calculateRemainingAmount(service).toLocaleString()}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {application.adminNotes && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">{application.adminNotes}</p>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <PaymentForm
              amount={calculateRemainingAmount(selectedService)}
              serviceId={selectedService.serviceId._id}
              onSuccess={() => handlePaymentSuccess(selectedService.serviceId._id)}
              onCancel={() => {
                setShowPayment(false);
                setSelectedService(null);
              }}
              isAdmin={true}
            />
          </div>
        </div>
      )}
    </Card>
  );
};