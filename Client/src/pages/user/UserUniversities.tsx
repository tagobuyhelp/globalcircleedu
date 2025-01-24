import React from 'react';
import { Card } from '../../components/ui/Card';

export const UserUniversities = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Universities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* University cards will be mapped here */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Sample University</h3>
          <p className="text-gray-600 dark:text-gray-400">
            University details will be displayed here
          </p>
        </Card>
      </div>
    </div>
  );
};