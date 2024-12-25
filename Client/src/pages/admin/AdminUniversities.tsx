import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminUniversities = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">University Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold">University Management</h3>
          <p className="text-gray-600 dark:text-gray-400">
            University management interface will be implemented here
          </p>
        </Card>
      </div>
    </div>
  );
};