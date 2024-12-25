import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { Course } from '../types/course';

interface CourseBottomBarProps {
  course: Course;
  onApply: () => void;
}

export const CourseBottomBar: React.FC<CourseBottomBarProps> = ({ course, onApply }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 lg:hidden">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1 grid grid-cols-2 gap-2 mr-4">
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 mr-1 text-blue-600" />
            <span className="font-semibold">${course.fee.toLocaleString()}/yr</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-1 text-blue-600" />
            <span>{course.duration}</span>
          </div>
        </div>
        <Button onClick={onApply} className="flex-shrink-0">
          Apply Now
        </Button>
      </div>
    </div>
  );
};