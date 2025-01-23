import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { DollarSign, Check, AlertCircle } from 'lucide-react';
import type { Service } from '../types/service';

interface ServiceCardProps {
  service: Service;
  onSelect: (serviceId: string) => void;
  selected?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onSelect,
  selected 
}) => {
  const totalMandatoryFees = service.fees
    .filter(fee => !fee.isOptional)
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <Card className={`p-6 transition-all duration-300 ${
      selected 
        ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
        : 'hover:shadow-lg'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {service.description}
          </p>
        </div>
        {selected && (
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
            <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Base Fee</span>
          <span className="text-lg font-bold">${totalMandatoryFees}</span>
        </div>

        {service.fees.length > 0 && (
          <div className="border-t pt-4 space-y-2">
            {service.fees.map((fee, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span>{fee.name}</span>
                  {fee.isOptional && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">
                      Optional
                    </span>
                  )}
                </div>
                <span className="font-medium">${fee.amount}</span>
              </div>
            ))}
          </div>
        )}

        {service.commissionRate > 0 && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{service.commissionRate}% Commission Rate</span>
          </div>
        )}

        {!service.isActive && (
          <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>Currently Unavailable</span>
          </div>
        )}
      </div>

      <Button
        onClick={() => onSelect(service._id)}
        className="w-full mt-6"
        variant={selected ? 'outline' : 'primary'}
        disabled={!service.isActive}
      >
        {selected ? 'Deselect Service' : 'Select Service'}
      </Button>
    </Card>
  );
};