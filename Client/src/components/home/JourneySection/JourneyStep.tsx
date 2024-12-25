import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface JourneyStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
  color: string;
  link: string;
  isActive?: boolean;
}

export const JourneyStep: React.FC<JourneyStepProps> = ({
  icon: Icon,
  title,
  description,
  step,
  color,
  link,
  isActive = false,
}) => {
  return (
    <Link 
      to={link}
      className={cn(
        "relative p-6 rounded-lg transition-all duration-300",
        "hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm",
        "group cursor-pointer transform hover:scale-105",
        isActive && "ring-2 ring-indigo-500 dark:ring-indigo-400"
      )}
    >
      <div className="flex items-start space-x-4">
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
          `bg-${color}-100 dark:bg-${color}-900 group-hover:bg-${color}-200 dark:group-hover:bg-${color}-800`,
          "transition-colors duration-300"
        )}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-sm font-medium text-${color}-600 dark:text-${color}-400`}>
                Step {step}
              </span>
              <h3 className="text-lg font-semibold mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {title}
              </h3>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      
      {step < 9 && (
        <div className="absolute left-11 top-[4.5rem] w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700" />
      )}
    </Link>
  );
};