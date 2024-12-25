import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import type { CreateCourseInput } from '../types';

interface CreateCourseFormProps {
  onSubmit: (data: CreateCourseInput) => Promise<void>;
  isLoading?: boolean;
  error?: any;
}

export const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCourseInput>();

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

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Program ID
        </label>
        <input
          type="text"
          {...register('program', { required: 'Program ID is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.program && (
          <p className="mt-1 text-sm text-red-600">{errors.program.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Credits
          </label>
          <input
            type="number"
            {...register('credits', { required: 'Credits are required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.credits && (
            <p className="mt-1 text-sm text-red-600">{errors.credits.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Duration
          </label>
          <input
            type="text"
            {...register('duration', { required: 'Duration is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Instructor
        </label>
        <input
          type="text"
          {...register('instructor', { required: 'Instructor name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.instructor && (
          <p className="mt-1 text-sm text-red-600">{errors.instructor.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Mode
        </label>
        <select
          {...register('mode', { required: 'Mode is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        {errors.mode && (
          <p className="mt-1 text-sm text-red-600">{errors.mode.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Fee
        </label>
        <input
          type="number"
          {...register('fee', { required: 'Fee is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.fee && (
          <p className="mt-1 text-sm text-red-600">{errors.fee.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Prerequisites (comma-separated)
        </label>
        <input
          type="text"
          {...register('prerequisites')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Course...' : 'Create Course'}
      </Button>
    </form>
  );
};