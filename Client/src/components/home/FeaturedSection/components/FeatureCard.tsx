import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '../../../ui/Card';
import { Button } from '../../../ui/Button';
import { CourseSlider } from './CourseSlider';
import type { Feature } from '../types';

const colorMap = {
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400'
};

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4"
      style={{ borderTopColor: `var(--${feature.color}-500)` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-3 rounded-xl ${colorMap[feature.color]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
        </div>
        <Link 
          to={feature.viewAllLink}
          className={`text-${feature.color}-600 hover:text-${feature.color}-700 text-sm font-medium`}
        >
          View All
        </Link>
      </div>

      {feature.title === 'Featured Courses' ? (
        <CourseSlider />
      ) : (
        <div className="space-y-4">
          {feature.items.map((item, idx) => (
            <Link 
              key={idx}
              to={item.link}
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.institution || item.company || item.date}
                    {item.location && ` • ${item.location}`}
                    {item.duration && ` • ${item.duration}`}
                    {item.ranking && ` • ${item.ranking}`}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Button 
          variant="outline"
          className="w-full group"
          onClick={() => window.location.href = feature.viewAllLink}
        >
          <span>Explore {feature.title}</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
};