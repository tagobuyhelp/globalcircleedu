import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ServiceCard } from '../../services/components/ServiceCard';
import { PaymentForm } from '../../../components/payment/PaymentForm';
import { agentApi } from '../api/agentApi';
import type { Service } from '../../services/types/service';
import type { Visitor } from '../types';

interface ApplicationFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onSubmit,
  onCancel,
  isLoading
}) => {
  const [step, setStep] = useState(1);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [visitorsData, servicesData] = await Promise.all([
          agentApi.getVisitors(),
          agentApi.getServices()
        ]);
        setVisitors(visitorsData.visitors);
        setServices(servicesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load form data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotalAmount = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s._id === serviceId);
      if (!service) return total;
      return total + service.fees.reduce((sum, fee) => 
        sum + (fee.isOptional ? 0 : fee.amount), 0);
    }, 0);
  };

  const handleNext = () => {
    if (step === 1 && !selectedVisitor) {
      setError('Please select a visitor');
      return;
    }
    if (step === 2 && selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }
    setError(null);
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      await onSubmit({
        visitorId: selectedVisitor,
        services: selectedServices.map(serviceId => ({ serviceId }))
      });
    } catch (err) {
      setError('Failed to create application');
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    handleSubmit();
  };

  if (loading) return <div>Loading form data...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <Card className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Create New Application</h2>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-3 h-3 rounded-full ${
                  step >= stepNumber 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Select Visitor</h3>
          <div className="grid gap-4">
            {visitors.map((visitor) => (
              <div
                key={visitor._id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedVisitor === visitor._id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
                onClick={() => setSelectedVisitor(visitor._id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{visitor.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {visitor.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {visitor.phone}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    visitor.visitorType === 'Student'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {visitor.visitorType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Select Services</h3>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onSelect={handleServiceToggle}
                selected={selectedServices.includes(service._id)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Review & Confirm</h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Selected Visitor</h4>
              {visitors.find(v => v._id === selectedVisitor)?.name}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Selected Services</h4>
              <div className="space-y-2">
                {selectedServices.map(serviceId => {
                  const service = services.find(s => s._id === serviceId);
                  if (!service) return null;
                  return (
                    <div key={serviceId} className="flex justify-between">
                      <span>{service.name}</span>
                      <span className="font-medium">
                        ${service.fees.reduce((sum, fee) => 
                          sum + (fee.isOptional ? 0 : fee.amount), 0
                        )}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>${calculateTotalAmount()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        
        {step < 3 ? (
          <Button onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button 
            onClick={() => setShowPayment(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create & Pay'}
          </Button>
        )}
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <PaymentForm
              amount={calculateTotalAmount()}
              serviceId={selectedServices[0]} // Using first service for now
              onSuccess={handlePaymentSuccess}
              onCancel={() => setShowPayment(false)}
            />
          </div>
        </div>
      )}
    </Card>
  );
};