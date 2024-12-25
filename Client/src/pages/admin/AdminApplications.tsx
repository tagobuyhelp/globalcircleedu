import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminApplications = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Application Management</h1>
      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Application Management</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Application management interface will be implemented here
          </p>
        </Card>
      </div>
    </div>
  );
};