// src/features/agent/components/CreateApplicationForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

interface CreateApplicationFormData {
  visitorId: string;
  serviceId: string;
}

interface CreateApplicationFormProps {
  onSubmit: (data: CreateApplicationFormData) => Promise<void>;
  services: Array<{ _id: string; name: string }>;
  isLoading?: boolean;
}

export const CreateApplicationForm: React.FC<CreateApplicationFormProps> = ({
  onSubmit,
  services,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateApplicationFormData>();

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Create New Application</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Visitor Information
          </label>
          <input
            type="text"
            {...register('visitorId', { required: 'Visitor ID is required' })}
            placeholder="Visitor ID"
            className="w-full p-2 border rounded-lg"
          />
          {errors.visitorId && (
            <p className="text-red-600 text-sm mt-1">{errors.visitorId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Service
          </label>
          <select
            {...register('serviceId', { required: 'Service is required' })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="text-red-600 text-sm mt-1">{errors.serviceId.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Creating...' : 'Create Application'}
        </Button>
      </form>
    </Card>
  );
};
