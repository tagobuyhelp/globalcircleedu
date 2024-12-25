import React from 'react';
import { Card } from '../../components/ui/Card';

export const UserJobs = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Job Opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job listings will be mapped here */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Sample Job Position</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Job details will be displayed here
          </p>
        </Card>
      </div>
    </div>
  );
};