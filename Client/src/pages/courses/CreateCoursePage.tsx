import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { CreateCourseForm } from '../../features/courses/components/CreateCourseForm';
import { createCourse } from '../../features/courses/api/createCourse';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import type { CreateCourseInput } from '../../features/courses/types';

export const CreateCoursePage = () => {
  const navigate = useNavigate();
  const { error, handleError } = useErrorHandler();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: CreateCourseInput) => {
    try {
      setIsLoading(true);
      await createCourse(data);
      navigate('/courses');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
      
      <Card className="p-6">
        <CreateCourseForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </Card>
    </div>
  );
};