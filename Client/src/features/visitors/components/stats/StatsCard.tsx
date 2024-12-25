import React from 'react';
import { Card } from '../../../../components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-semibold">{value}</p>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};