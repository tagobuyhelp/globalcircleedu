import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, GraduationCap, BookOpen, Users, 
  DollarSign, MapPin, Building2, Calendar,
  ChevronLeft 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Footer } from '../../components/layout/Footer';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { CourseBottomBar } from '../../features/courses/components/CourseBottomBar';
import { CourseDetails } from '../../features/courses/components/CourseDetails';
import { UniversityCard } from '../../features/courses/components/UniversityCard';
import { courseApi } from '../../features/courses/api/courseApi';
import type { Course } from '../../features/courses/types/course';

export const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) {
          setError('Course ID not found');
          return;
        }
        const data = await courseApi.getById(id);
        setCourse(data);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleApply = () => {
    // Handle course application
    console.log('Applying for course:', course?._id);
  };

  if (loading) {
    return <LoadingSpinner message="Loading course details..." />;
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Course not found'}</p>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    program,
    duration,
    credits,
    fee,
    mode
  } = course;

  const {
    university,
    applicationDeadline,
    availableSeats
  } = program;

  return (
    <>
      <Helmet>
        <title>{`${name} | Global Circle Edu`}</title>
        <meta name="description" content={course.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link to="/courses" className="text-blue-600 hover:text-blue-700 flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Courses
              </Link>
              <h1 className="text-3xl font-bold mt-4">{name}</h1>
              <div className="flex items-center mt-2">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-lg">{university.name}</span>
              </div>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {mode}
              </div>
            </div>

            <img
              src={university.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'}
              alt={name}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />

            <CourseDetails course={course} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tuition Fee</span>
                  <span className="text-xl font-bold">${fee.toLocaleString()}/yr</span>
                </div>

                <Button className="w-full" onClick={handleApply}>Apply Now</Button>
              </div>

              <hr className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{program.degree.name}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{university.location}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{duration}</span>
                </div>

                <div className="flex items-center text-sm">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{credits} Credits</span>
                </div>

                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{availableSeats} Available Seats</span>
                </div>

                {applicationDeadline && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Application Deadline: {new Date(applicationDeadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </Card>

            <UniversityCard university={university} />
          </div>
        </div>
      </div>
      
      <CourseBottomBar course={course} onApply={handleApply} />
      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
    </>
  );
};