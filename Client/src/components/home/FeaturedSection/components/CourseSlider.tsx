import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Building2, DollarSign } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { Carousel } from '../../../ui/Carousel';
import { courseApi } from '../../../../features/courses/api/courseApi';
import type { Course } from '../../../../features/courses/types/course';

export const CourseSlider = () => {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.getAll();
        // Take first 6 courses for the slider
        setCourses(data.slice(0, 6));
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading || courses.length === 0) return null;

  const courseSlides = courses.map((course) => (
    <Link 
      key={course._id}
      to={`/courses/${course._id}`}
      className="block p-2"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <img
          src={course.program.university.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'}
          alt={course.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{course.name}</h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <Building2 className="w-4 h-4 mr-2" />
            <span className="line-clamp-1">{course.program.university.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>${course.fee.toLocaleString()}/yr</span>
            </div>
          </div>
          <Button className="w-full">View Details</Button>
        </div>
      </div>
    </Link>
  ));

  return (
    <Carousel 
      items={courseSlides}
      className="pb-12"
      interval={6000}
    />
  );
};