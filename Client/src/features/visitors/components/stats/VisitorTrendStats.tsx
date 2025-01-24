import React from 'react';
import { Card } from '../../../../components/ui/Card';
import type { VisitorStats } from '../../types/stats';

interface VisitorTrendStatsProps {
  stats: VisitorStats;
}

export const VisitorTrendStats: React.FC<VisitorTrendStatsProps> = ({ stats }) => {
  const { monthlyTrends, ageDistribution } = stats;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
        <div className="space-y-4">
          {monthlyTrends.map((trend) => (
            <div key={trend._id} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(trend._id).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </span>
              <span className="font-medium">{trend.count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
        <div className="space-y-4">
          {ageDistribution.map((age) => (
            <div key={age._id} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {age._id} years
              </span>
              <span className="font-medium">{age.count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};