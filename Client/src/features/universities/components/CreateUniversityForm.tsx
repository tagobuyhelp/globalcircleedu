import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import type { University } from '../types';

type CreateUniversityInput = Omit<University, 'id' | 'courses' | 'createdAt' | 'updatedAt'>;

interface CreateUniversityFormProps {
  onSubmit: (data: CreateUniversityInput) => Promise<void>;
  isLoading?: boolean;
  error?: any;
}

export const CreateUniversityForm: React.FC<CreateUniversityFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUniversityInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <ErrorMessage error={error} />}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          University Name
        </label>
        <input
          type="text"
          {...register('name', { required: 'University name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Country
          </label>
          <input
            type="text"
            {...register('country', { required: 'Country is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type
          </label>
          <select
            {...register('type', { required: 'Type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select type</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ranking
          </label>
          <input
            type="number"
            {...register('ranking', { required: 'Ranking is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.ranking && (
            <p className="mt-1 text-sm text-red-600">{errors.ranking.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Established Date
          </label>
          <input
            type="date"
            {...register('established', { required: 'Established date is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.established && (
            <p className="mt-1 text-sm text-red-600">{errors.established.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Acceptance Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            {...register('acceptanceRate', { 
              required: 'Acceptance rate is required',
              min: { value: 0, message: 'Must be greater than 0' },
              max: { value: 100, message: 'Must be less than 100' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.acceptanceRate && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptanceRate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of Students
        </label>
        <input
          type="number"
          {...register('numberOfStudents', { required: 'Number of students is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        {errors.numberOfStudents && (
          <p className="mt-1 text-sm text-red-600">{errors.numberOfStudents.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Logo URL
        </label>
        <input
          type="url"
          {...register('logo')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        {errors.logo && (
          <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Campus Photos (comma-separated URLs)
        </label>
        <input
          type="text"
          {...register('campusPhotos')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        {errors.campusPhotos && (
          <p className="mt-1 text-sm text-red-600">{errors.campusPhotos.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating University...' : 'Create University'}
      </Button>
    </form>
  );
};