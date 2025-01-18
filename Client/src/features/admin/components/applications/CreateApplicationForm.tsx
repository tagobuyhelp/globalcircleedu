// src/features/admin/components/applications/CreateApplicationForm.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { adminApi } from '../../api/adminApi';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';

interface Visitor {
  _id: string;
  name: string;
  email: string;
}

interface Service {
  _id: string;
  name: string;
  fees: Array<{ name: string; amount: number; isOptional: boolean }>;
}

interface ServiceSelection {
  serviceId: string;
  status: string;
  paymentStatus: string;
  amountPaid: number;
}

interface CreateApplicationFormProps {
  onSubmit: (data: {
    visitorId: string;
    agentId?: string;
    services: Array<{
      serviceId: string;
      status: string;
      paymentStatus: string;
      amountPaid: number;
    }>;
    adminNotes?: string;
  }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}


export const CreateApplicationForm: React.FC<CreateApplicationFormProps> = ({
  onSubmit,
  onCancel,
  isLoading
}) => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceSelection[]>([]);
  const [visitorId, setVisitorId] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!visitorId || selectedServices.length === 0) {
      setError('Please select a visitor and at least one service');
      return;
    }

    try {
      await onSubmit({
        visitorId,
        services: selectedServices,
        adminNotes: adminNotes || undefined
      });
    } catch (err) {
      setError('Failed to create application');
      console.error(err);
    }
  };

 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const [visitorsData, servicesData] = await Promise.all([
        adminApi.getVisitors(),
        adminApi.getServices()
      ]);
      
      setVisitors(Array.isArray(visitorsData) ? visitorsData : []);
      setServices(Array.isArray(servicesData) ? servicesData : []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load form data');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  const addService = () => {
    setSelectedServices([...selectedServices, {
      serviceId: '',
      status: 'Pending',
      paymentStatus: 'Pending',
      amountPaid: 0
    }]);
  };

  const removeService = (index: number) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof ServiceSelection, value: any) => {
    const updated = [...selectedServices];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedServices(updated);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Create New Application</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Select Visitor *</label>
          <select
            value={visitorId}
            onChange={(e) => setVisitorId(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select a visitor</option>
            {visitors.map((visitor) => (
              <option key={visitor._id} value={visitor._id}>
                {visitor.name} ({visitor.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Services *</label>
            <Button type="button" onClick={addService} size="sm">
              Add Service
            </Button>
          </div>
          
          <div className="space-y-4">
            {selectedServices.map((selection, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={selection.serviceId}
                    onChange={(e) => updateService(index, 'serviceId', e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  
                  <div>
  <label className="block text-sm font-medium mb-1">Amount Paid</label>
  <input
    type="number"
    value={selection.amountPaid}
    onChange={(e) => updateService(index, 'amountPaid', Number(e.target.value))}
    className="w-full p-2 border rounded-lg"
  />
</div>

                </div>
                
                {selection.serviceId && (
                  <div className="mt-2 text-sm text-gray-600">
                    Fees:
                    {services
                      .find(s => s._id === selection.serviceId)
                      ?.fees.map((fee, i) => (
                        <div key={i}>
                          {fee.name}: ${fee.amount} {fee.isOptional ? '(Optional)' : ''}
                        </div>
                      ))}
                  </div>
                )}

                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => removeService(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Admin Notes</label>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || !visitorId || selectedServices.length === 0}
          >
            {isLoading ? 'Creating...' : 'Create Application'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
