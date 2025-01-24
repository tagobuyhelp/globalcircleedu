import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CourseList } from '../../features/courses/components/CourseList';
import { CourseFilters } from '../../components/filters/CourseFilters';
import { Footer } from '../../components/layout/Footer';
import { courseApi } from '../../features/courses/api/courseApi';
import { useViewToggle } from '../../hooks/useViewToggle';
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
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { view, toggleView } = useViewToggle();
  const { 
    filters, 
    updateFilters, 
    isFilterDrawerOpen, 
    openFilterDrawer, 
    closeFilterDrawer 
  } = useFilters(initialFilters);

  // Extract unique values for filter options
  const programs = [...new Set(courses.map(course => course.program.name))];
  const countries = [...new Set(courses.map(course => course.program.university.location))];
  const degrees = [...new Set(courses.map(course => course.program.degree.name))];

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
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading courses...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  const filterProps = {
    filters,
    onFilterChange: updateFilters,
    programs,
    countries,
    degrees,
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Header */}
        <div className="lg:hidden space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Available Courses</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={openFilterDrawer}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Collapsible Search Bar */}
          {isSearchVisible && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Available Courses</h1>
          
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block col-span-3">
            <CourseFilters
              {...filterProps}
              isOpen={false}
              onClose={() => {}}
            />
          </div>

          {/* Course List */}
          <div className="col-span-12 lg:col-span-9">
            <CourseList 
              courses={filteredCourses}
              view={view}
              onViewChange={toggleView}
              onApply={(courseId) => console.log('Applying for course:', courseId)}
            />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterDrawerOpen && (
          <CourseFilters
            {...filterProps}
            isOpen={true}
            onClose={closeFilterDrawer}
          />
        )}
      </div>
      <Footer />
    </>
  );
};