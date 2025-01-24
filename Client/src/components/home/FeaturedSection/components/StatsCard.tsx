import React from 'react';
import { cn } from '../../../../utils/cn';

interface StatsCardProps {
  label: string;
  value: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, className }) => {
  return (
    <div 
      className={cn(
        "p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",
        "border border-gray-200 dark:border-gray-700",
        "transform hover:scale-105 transition-transform duration-300",
        className
      )}
    >
      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
};