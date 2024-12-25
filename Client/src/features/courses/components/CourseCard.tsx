import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { 
  Clock, GraduationCap, BookOpen, Users, 
  DollarSign, MapPin, Heart, Eye, Building2 
} from 'lucide-react';
import type { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onAddInterest: (courseId: string) => void;
  view: 'grid' | 'list';
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onAddInterest,
  view 
}) => {
  const CardContent = () => (
    <div className={`flex ${view === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}>
      <div className={`${view === 'list' ? 'w-full md:w-64 flex-shrink-0' : 'w-full'}`}>
        <img
          src={course.program.university.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'}
          alt={course.name}
          className={`object-cover ${view === 'list' ? 'h-48 md:h-full w-full' : 'w-full h-48'}`}
        />
      </div>

      <div className="flex-1 p-4">
        <div className="flex flex-col h-full">
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
              <div>
                <h3 className="text-lg font-semibold line-clamp-2">{course.name}</h3>
                <div className="flex items-center mt-1 text-gray-600">
                  <Building2 className="w-4 h-4 mr-1" />
                  <span className="text-sm">{course.program.university.name}</span>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full self-start">
                {course.mode}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-grow">
            <div className="flex items-center text-sm">
              <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
              <span className="line-clamp-1">{course.program.degree.name}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              <span className="line-clamp-1">{course.program.university.location}</span>
            </div>

            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <span>{course.duration}</span>
            </div>

            <div className="flex items-center text-sm">
              <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
              <span>{course.credits} Credits</span>
            </div>

            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              <span>{course.program.availableSeats} Seats</span>
            </div>

            <div className="flex items-center text-sm">
              <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
              <span>${course.fee.toLocaleString()}/yr</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline"
              className="flex-1 text-sm"
              onClick={(e) => {
                e.preventDefault();
                onAddInterest(course._id);
              }}
            >
              <Heart className="w-4 h-4 mr-1" />
              <span className="whitespace-nowrap">Add Interest</span>
            </Button>
            <Link to={`/courses/${course._id}`} className="flex-1">
              <Button className="w-full text-sm">
                <Eye className="w-4 h-4 mr-1" />
                <span className="whitespace-nowrap">View Details</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="overflow-hidden h-full">
      <CardContent />
    </Card>
  );
};