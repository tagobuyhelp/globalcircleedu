import React from 'react';
import { CourseCard } from './CourseCard';
import type { Course } from '../types/course';

interface CourseListProps {
  courses: Course[];
  onApply: (courseId: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  onApply 
}) => {
  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <CourseCard 
          key={course._id} 
          course={course} 
          onAddInterest={onApply}
        />
      ))}
    </div>
  );
};