// src/features/agent/components/StatsOverview.tsx
import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Users, DollarSign, CheckCircle } from 'lucide-react';
import type { AgentStats } from '../types';

interface StatsOverviewProps {
  stats: AgentStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Users,
    },
    {
      title: 'Total Earned',
      value: `$${stats.totalEarned}`,
      icon: DollarSign,
    },
    {
      title: 'Available Balance',
      value: `$${stats.availableBalance}`,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
