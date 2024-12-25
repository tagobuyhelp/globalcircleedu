import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../ui/Button';
import { courseApi } from '../../../../features/courses/api/courseApi';
import type { Course } from '../../../../features/courses/types/course';

export const CourseSlider = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.getAll();
        // Randomize courses
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setCourses(shuffled.slice(0, 6)); // Take 6 random courses
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Auto-slide every 5 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(courses.length / 2));
    }, 5000);

    return () => clearInterval(timer);
  }, [courses.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(courses.length / 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.ceil(courses.length / 2) - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {courses.map((course, index) => (
            <Link
              key={course._id}
              to={`/courses/${course._id}`}
              className="w-full md:w-1/2 flex-shrink-0 p-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full hover:shadow-lg transition-shadow">
                <h4 className="font-medium text-lg mb-2 line-clamp-1">
                  {course.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {course.program.university.name}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 dark:text-blue-400">
                    {course.duration}
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {course.mode}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(Math.ceil(courses.length / 2))].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex 
                ? 'w-4 bg-blue-600 dark:bg-blue-400' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};