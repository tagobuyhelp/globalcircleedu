import React from 'react';
import { Card } from '../../../components/ui/Card';
import type { Course } from '../types/course';

interface CourseDetailsProps {
  course: Course;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  const { description, prerequisites = [] } = course;

  return (
    <>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Course Description</h2>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{description}</p>
      </Card>

      {prerequisites.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-2">
            {prerequisites.map((prereq, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-400">{prereq}</li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
};