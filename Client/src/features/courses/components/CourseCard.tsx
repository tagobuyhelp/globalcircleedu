import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useAuthStore } from '../../../store/authStore';
import { visitorApi } from '../../../features/visitors/api/visitorApi';
import toast from 'react-hot-toast';
import {
  Clock, GraduationCap, BookOpen, Users, 
  DollarSign, MapPin, Heart, Eye, Building2
} from 'lucide-react';
import type { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onAddInterest: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onAddInterest
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const handleInterestClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to add this course to your interests');
      navigate('/login', { 
        state: { from: `/courses/${course._id}` }
      });
      return;
    }

    try {
      await visitorApi.update(user.id, {
        interestedCourse: course._id
      });
      onAddInterest(course._id);
      toast.success('Course added to your interests!');
    } catch (error) {
      console.error('Error updating interest:', error);
      toast.error('Failed to add course to interests. Please try again.');
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col lg:flex-row">
      {/* Image Container - Hidden on mobile, 30% width on desktop */}
      <div className="hidden lg:block w-[30%] relative">
        <img
          src={course.program.university.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'}
          alt={course.name}
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>

      {/* Content Container - Full width on mobile, 70% on desktop */}
      <div className="w-full lg:w-[70%] p-6 flex flex-col">
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold line-clamp-2">{course.name}</h3>
              <div className="flex items-center mt-1 text-gray-600">
                <Building2 className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{course.program.university.name}</span>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {course.mode}
            </span>
          </div>
          
          {/* Course Details */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center text-sm">
              <GraduationCap className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
              <span className="line-clamp-1">{course.program.degree.name}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-sm">
              <DollarSign className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
              <span>${course.fee.toLocaleString()}/yr</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
              <span>{course.program.availableSeats} Seats</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={handleInterestClick}
          >
            <Heart className="w-4 h-4 mr-2" />
            Add Interest
          </Button>
          <Link to={`/courses/${course._id}`} className="flex-1">
            <Button className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};