import React from 'react';
import { Card } from '../../../../components/ui/Card';
import type { VisitorStats } from '../../types/stats';

interface VisitorDistributionStatsProps {
  stats: VisitorStats;
}

export const VisitorDistributionStats: React.FC<VisitorDistributionStatsProps> = ({ stats }) => {
  const { educationLevelDistribution, preferredContactMethod, topCountries } = stats;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Education Level Distribution</h3>
        <div className="space-y-4">
          {educationLevelDistribution.map((level) => (
            <div key={level._id} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">{level._id}</span>
              <span className="font-medium">{level.count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Preferences</h3>
        <div className="space-y-4">
          {preferredContactMethod.map((method) => (
            <div key={method._id} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">{method._id}</span>
              <span className="font-medium">{method.count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
        <div className="space-y-4">
          {topCountries.map((country) => (
            <div key={country._id} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">{country._id}</span>
              <span className="font-medium">{country.count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};