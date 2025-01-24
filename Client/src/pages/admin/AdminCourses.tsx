// src/pages/admin/AdminCourses.tsx

import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CourseForm } from '../../features/courses/components/CourseForm';
import { courseApi } from '../../features/courses/api/courseApi';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import type { Course, CreateCourseInput } from '../../features/courses/types/course';

export const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (data: CreateCourseInput) => {
    try {
      await courseApi.create(data);
      setIsFormOpen(false);
      fetchCourses();
    } catch (err) {
      console.error('Error creating course:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await courseApi.delete(id);
      fetchCourses();
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
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
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course._id} className="p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {course.program.university.name}
                </p>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Credits: {course.credits}</p>
                  <p>Duration: {course.duration}</p>
                  <p>Fee: ${course.fee.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsFormOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CourseForm
              initialData={selectedCourse}
              onSubmit={handleCreate}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedCourse(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
