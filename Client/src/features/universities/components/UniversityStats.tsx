import React from 'react';
import { Users, GraduationCap, Briefcase, Percent } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type { University } from '../types/university';

interface UniversityStatsProps {
  university: University;
}

export const UniversityStats: React.FC<UniversityStatsProps> = ({ university }) => {
  const stats = [
    {
      icon: Users,
      label: 'Students',
      value: university.numberOfStudents.toLocaleString(),
    },
    {
      icon: GraduationCap,
      label: 'Programs',
      value: '50+',
    },
    {
      icon: Briefcase,
      label: 'Career Placement',
      value: '92%',
    },
    {
      icon: Percent,
      label: 'Acceptance Rate',
      value: `${university.acceptanceRate}%`,
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">University Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-3">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};