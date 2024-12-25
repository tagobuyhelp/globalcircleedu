import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Clock, BookOpen, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Program {
  _id: string;
  name: string;
  description: string;
  duration: string;
  fee: number;
  degree: {
    _id: string;
    name: string;
  };
  prerequisites: string[];
  availableSeats: number;
  applicationDeadline: string;
  courses: any[];
}

interface ProgramListProps {
  programs: Program[];
}

export const ProgramList: React.FC<ProgramListProps> = ({ programs }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Available Programs</h2>
      <div className="space-y-4">
        {programs.map((program) => (
          <div
            key={program._id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{program.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {program.description}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{program.courses.length} Courses</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{program.availableSeats} Seats</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Deadline: {new Date(program.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="text-lg font-bold text-blue-600">
                  ${program.fee.toLocaleString()}/yr
                </span>
                <Link to={`/programs/${program._id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};