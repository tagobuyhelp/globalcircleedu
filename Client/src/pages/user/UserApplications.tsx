import React from 'react';
import { Card } from '../../components/ui/Card';

export const UserApplications = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Applications</h1>
      <div className="space-y-4">
        {/* Applications will be mapped here */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Application #1</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Application details will be displayed here
          </p>
        </Card>
      </div>
    </div>
  );
};