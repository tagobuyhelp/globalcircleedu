import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface JourneyGridProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}

export const JourneyGrid: React.FC<JourneyGridProps> = ({
  icon: Icon,
  title,
  description,
  step,
}) => {
  return (
    <div className={cn(
      "p-6 rounded-lg transition-all duration-300",
      "bg-white dark:bg-gray-800 hover:shadow-lg",
      "border border-gray-200 dark:border-gray-700",
      "group cursor-pointer"
    )}>
      <div className="text-center">
        <div className="mb-4 mx-auto">
          <div className={cn(
            "w-16 h-16 rounded-full mx-auto flex items-center justify-center",
            "bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-600",
            "transition-colors duration-300"
          )}>
            <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white" />
          </div>
          <span className="inline-block mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
            Step {step}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};