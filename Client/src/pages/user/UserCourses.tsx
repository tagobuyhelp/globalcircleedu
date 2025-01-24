import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search } from 'lucide-react';

const SAMPLE_COURSES = [
  {
    id: 1,
    title: 'Computer Science',
    university: 'Tech University',
    duration: '4 years',
    level: 'Bachelor',
    tuition: '$20,000/year',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  },
  {
    id: 2,
    title: 'Business Administration',
    university: 'Business School',
    duration: '2 years',
    level: 'Master',
    tuition: '$25,000/year',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  },
];

export const UserCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Available Courses</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_COURSES.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{course.university}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Duration:</span> {course.duration}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Level:</span> {course.level}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Tuition:</span> {course.tuition}
                </p>
              </div>
              <div className="mt-4">
                <Button className="w-full">Learn More</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};