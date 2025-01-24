import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Clock, BookOpen } from 'lucide-react';
import type { University } from '../types/university';

interface UniversityProgramsProps {
  university: University;
}

export const UniversityPrograms: React.FC<UniversityProgramsProps> = ({ university }) => {
  // Mock programs data - replace with actual data from API
  const programs = [
    {
      id: 1,
      name: 'Bachelor of Computer Science',
      duration: '4 years',
      type: 'Undergraduate',
      courses: 42,
    },
    {
      id: 2,
      name: 'Master of Business Administration',
      duration: '2 years',
      type: 'Graduate',
      courses: 24,
    },
    // Add more programs
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Available Programs</h2>
      <div className="space-y-4">
        {programs.map((program) => (
          <div
            key={program.id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{program.name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{program.courses} Courses</span>
                  </div>
                </div>
              </div>
              <Button>View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};