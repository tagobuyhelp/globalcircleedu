import React from 'react';
import { Card } from '../../components/ui/Card';
import { Users, DollarSign, FileText } from 'lucide-react';

export const AgentDashboard = () => {
  const stats = [
    { title: 'Total Visitors', value: '45', icon: Users, color: 'blue' },
    { title: 'Total Earnings', value: '$5,678', icon: DollarSign, color: 'green' },
    { title: 'Active Applications', value: '12', icon: FileText, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agent Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Visitors</h2>
          {/* Add recent visitors list here */}
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Pending Applications</h2>
          {/* Add pending applications list here */}
        </Card>
      </div>
    </div>
  );
};