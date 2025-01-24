import React from 'react';
import { Card } from '../../../../components/ui/Card';
import { 
  Users, FileText, DollarSign, 
  CheckCircle, XCircle, Clock 
} from 'lucide-react';
import type { ApplicationStats } from '../../types/application';

interface ApplicationStatsProps {
  stats: ApplicationStats;
}

export const ApplicationStats: React.FC<ApplicationStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Pending',
      value: stats.pendingApplications,
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Completed',
      value: stats.completedApplications,
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Cancelled',
      value: stats.rejectedApplications,
      icon: XCircle,
      color: 'red'
    },
    {
      title: 'Total Amount',
      value: `₹${stats.totalAmountPaid.toLocaleString()}`,
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Total Commission',
      value: `₹${stats.totalCommissionAmount.toLocaleString()}`,
      icon: FileText,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
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