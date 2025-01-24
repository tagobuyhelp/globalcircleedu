import React, { useState } from 'react';
import { CourseList } from '../../features/courses/components/CourseList';
import { Card } from '../../components/ui/Card';
import { Search, Filter } from 'lucide-react';
import type { Course } from '../../features/courses/types';

const mockCourses: Course[] = [
  // Add mock data here for development
];

export const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses] = useState<Course[]>(mockCourses);

  const handleApply = (courseId: string) => {
    console.log('Applying for course:', courseId);
    // Implement application logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
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
          
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Filter Courses</h2>
            {/* Add filter options here */}
          </Card>
        </div>

        <div className="col-span-9">
          <CourseList courses={courses} onApply={handleApply} />
        </div>
      </div>
    </div>
  );
};