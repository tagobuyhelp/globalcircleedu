import React, { useEffect, useState } from 'react';
import { Building2, GraduationCap, BookOpen, Briefcase } from 'lucide-react';
import { LocationTooltipProps } from '../types';

export const LocationTooltip: React.FC<LocationTooltipProps> = ({ location }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Calculate tooltip position
    const calculatePosition = () => {
      const [x, y] = location.coordinates;
      const tooltipWidth = 300; // Max tooltip width
      const tooltipHeight = 160; // Approximate tooltip height
      const mapWidth = window.innerWidth;
      const mapHeight = window.innerHeight * 0.5; // Assuming map takes 50% of viewport height

      // Initial position (centered on point)
      let posX = x;
      let posY = y;

      // Adjust horizontal position if too close to edges
      if (x + tooltipWidth / 2 > mapWidth) {
        posX = x - tooltipWidth;
      } else if (x - tooltipWidth / 2 < 0) {
        posX = tooltipWidth / 2;
      }

      // Adjust vertical position if too close to top/bottom
      if (y - tooltipHeight < 0) {
        posY = y + 50; // Show below the point
      } else {
        posY = y - tooltipHeight; // Show above the point
      }

      setPosition({ x: posX, y: posY });
    };

    calculatePosition();
  }, [location]);

  if (!location.stats) return null;

  return (
    <div 
      className="absolute z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-[300px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, 0)',
      }}
    >
      <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
        {location.name}
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {location.stats.universities.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Universities
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-green-600" />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {location.stats.students.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Students
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {location.stats.courses.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Courses
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Briefcase className="w-4 h-4 text-orange-600" />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {location.stats.jobs.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Jobs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};