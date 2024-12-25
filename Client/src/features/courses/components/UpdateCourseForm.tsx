import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import type { Course, UpdateCourseInput } from '../types';

interface UpdateCourseFormProps {
  course: Course;
  onSubmit: (data: UpdateCourseInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: any;
}

export const UpdateCourseForm: React.FC<UpdateCourseFormProps> = ({
  course,
  onSubmit,
  onCancel,
  isLoading,
  error,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateCourseInput>({
    defaultValues: {
      ...course,
      prerequisites: course.prerequisites.join(', '),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <ErrorMessage error={error} />}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Course Name
        </label>
        <input
          type="text"
          {...register('name', { required: 'Course name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Add other fields similar to CreateCourseForm */}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Course'}
        </Button>
      </div>
    </form>
  );
};