import React, { useState, useEffect } from 'react';
import { Search, Filter, GraduationCap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CourseList } from '../../features/courses/components/CourseList';
import { CourseFilters } from '../../components/filters/CourseFilters';
import { Footer } from '../../components/layout/Footer';
import { courseApi } from '../../features/courses/api/courseApi';
import { useFilters } from '../../hooks/useFilters';
import type { Course } from '../../features/courses/types/course';

const initialFilters = {
  degree: [],
  program: [],
  country: [],
  mode: [],
  feeRange: [0, 100000],
};

export const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    filters, 
    updateFilters, 
    isFilterDrawerOpen, 
    openFilterDrawer, 
    closeFilterDrawer 
  } = useFilters(initialFilters);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await courseApi.getAll();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDegree = filters.degree.length === 0 || 
                         filters.degree.includes(course.program.degree.name);
    
    const matchesProgram = filters.program.length === 0 || 
                          filters.program.includes(course.program.name);
    
    const matchesCountry = filters.country.length === 0 || 
                          filters.country.includes(course.program.university.location);
    
    const matchesMode = filters.mode.length === 0 || 
                       filters.mode.includes(course.mode);
    
    const matchesFee = course.fee >= filters.feeRange[0] && 
                      course.fee <= filters.feeRange[1];

    return matchesSearch && matchesDegree && matchesProgram && 
           matchesCountry && matchesMode && matchesFee;
  });

  // Extract unique values for filter options
  const programs = [...new Set(courses.map(course => course.program.name))];
  const countries = [...new Set(courses.map(course => course.program.university.location))];
  const degrees = [...new Set(courses.map(course => course.program.degree.name))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#004e9a] to-[#f37021] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <GraduationCap className="w-16 h-16 mb-6" />
              <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Discover our wide range of courses from leading universities worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <Button onClick={openFilterDrawer} className="w-full sm:w-auto lg:hidden">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block col-span-3">
              <div className="sticky top-8">
                <CourseFilters
                  isOpen={false}
                  onClose={() => {}}
                  filters={filters}
                  onFilterChange={updateFilters}
                  programs={programs}
                  countries={countries}
                  degrees={degrees}
                />
              </div>
            </div>

            {/* Course List */}
            <div className="col-span-12 lg:col-span-9">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No courses found matching your criteria
                  </p>
                </div>
              ) : (
                <CourseList 
                  courses={filteredCourses}
                  onApply={(courseId) => console.log('Applying for course:', courseId)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isFilterDrawerOpen && (
        <CourseFilters
          isOpen={true}
          onClose={closeFilterDrawer}
          filters={filters}
          onFilterChange={updateFilters}
          programs={programs}
          countries={countries}
          degrees={degrees}
        />
      )}

      <Footer />
    </>
  );
};