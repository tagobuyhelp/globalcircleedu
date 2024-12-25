import React from 'react';
import { Card } from '../../components/ui/Card';
import { DollarSign } from 'lucide-react';

export const AgentEarnings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Earnings Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Earnings
              </p>
              <h3 className="text-2xl font-bold">$0.00</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};