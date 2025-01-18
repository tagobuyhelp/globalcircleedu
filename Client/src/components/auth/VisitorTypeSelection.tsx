import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GraduationCap, Briefcase } from 'lucide-react';

interface VisitorTypeSelectionProps {
  onSelect: (type: 'Student' | 'Worker') => void;
}

export const VisitorTypeSelection: React.FC<VisitorTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Select Your Profile Type
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Choose the option that best describes you
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="grid grid-cols-1 gap-4">
          <Card 
            className="p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onSelect('Student')}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Student</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Looking to study abroad or pursue higher education
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onSelect('Worker')}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Worker</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seeking work opportunities abroad
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};