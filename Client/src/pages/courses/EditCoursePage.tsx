import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { UpdateCourseForm } from '../../features/courses/components/UpdateCourseForm';
import { courseApi } from '../../features/courses/api/courseApi';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import type { Course, UpdateCourseInput } from '../../features/courses/types';

export const EditCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { error, handleError } = useErrorHandler();
  const [course, setCourse] = React.useState<Course | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;
        const data = await courseApi.getById(id);
        setCourse(data);
      } catch (err) {
        handleError(err);
      }
    };

    fetchCourse();
  }, [id, handleError]);

  const handleSubmit = async (data: UpdateCourseInput) => {
    try {
      setIsLoading(true);
      if (!id) return;
      await courseApi.update(id, data);
      navigate('/courses');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
      
      <Card className="p-6">
        <UpdateCourseForm
          course={course}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/courses')}
          isLoading={isLoading}
          error={error}
        />
      </Card>
    </div>
  );
};