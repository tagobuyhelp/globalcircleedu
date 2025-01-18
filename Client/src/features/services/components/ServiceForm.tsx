import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { Service, Fee } from '../types/service';

interface ServiceFormProps {
  service?: Service | null;
  onSubmit: (data: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onClose: () => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  onSubmit,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [fees, setFees] = useState<Omit<Fee, '_id'>[]>(
    service?.fees.map(fee => ({
      name: fee.name,
      amount: fee.amount,
      description: fee.description,
      isOptional: fee.isOptional,
      isActive: fee.isActive,
    })) || []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as Service['type'],
      fees,
      commissionRate: Number(formData.get('commissionRate')),
      isActive: formData.get('isActive') === 'true',
    };

    try {
      await onSubmit(data);
      onClose();
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addFee = () => {
    setFees([
      ...fees,
      {
        name: '',
        amount: 0,
        description: '',
        isOptional: false,
        isActive: true,
      },
    ]);
  };

  const removeFee = (index: number) => {
    setFees(fees.filter((_, i) => i !== index));
  };

  const updateFee = (index: number, field: keyof Fee, value: any) => {
    setFees(fees.map((fee, i) => 
      i === index ? { ...fee, [field]: value } : fee
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {service ? 'Edit Service' : 'Add Service'}
          </h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Service Name</label>
            <input
              type="text"
              name="name"
              defaultValue={service?.name}
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={service?.description}
              rows={3}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                defaultValue={service?.type}
                required
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="Study Abroad">Study Abroad</option>
                <option value="Job Placement">Job Placement</option>
                <option value="Other">Other</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Commission Rate (%)</label>
              <input
                type="number"
                name="commissionRate"
                defaultValue={service?.commissionRate}
                required
                min="0"
                max="100"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="isActive"
              defaultValue={service?.isActive?.toString()}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Fees</label>
              <Button type="button" size="sm" onClick={addFee}>
                <Plus className="h-4 w-4 mr-1" />
                Add Fee
              </Button>
            </div>
            
            <div className="space-y-4">
              {fees.map((fee, index) => (
                <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
                  <div className="flex-1 space-y-4">
                    <input
                      type="text"
                      value={fee.name}
                      onChange={(e) => updateFee(index, 'name', e.target.value)}
                      placeholder="Fee Name"
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        value={fee.amount}
                        onChange={(e) => updateFee(index, 'amount', Number(e.target.value))}
                        placeholder="Amount"
                        min="0"
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      />
                      
                      <select
                        value={fee.isOptional.toString()}
                        onChange={(e) => updateFee(index, 'isOptional', e.target.value === 'true')}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="false">Mandatory</option>
                        <option value="true">Optional</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => removeFee(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : service ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};