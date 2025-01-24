// src/features/courses/components/CourseForm.tsx

import React from 'react';
import { Button } from '../../../components/ui/Button';
import type { Course, CreateCourseInput } from '../types/course';

interface CourseFormProps {
  initialData?: Course | null;
  onSubmit: (data: CreateCourseInput) => Promise<void>;
  onCancel: () => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: CreateCourseInput = {
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
      program: formData.get('program') as string,
      credits: Number(formData.get('credits')),
      duration: formData.get('duration') as string,
      instructor: formData.get('instructor') as string || undefined,
      mode: formData.get('mode') as 'Online' | 'Offline' | 'Hybrid',
      fee: Number(formData.get('fee')),
      prerequisites: formData.get('prerequisites') as string 
        ? (formData.get('prerequisites') as string).split(',').map(p => p.trim())
        : []
    };

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Course Name *</label>
        <input
          name="name"
          defaultValue={initialData?.name}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          rows={3}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Program ID *</label>
        <input
          name="program"
          defaultValue={initialData?.program._id}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Credits *</label>
          <input
            type="number"
            name="credits"
            defaultValue={initialData?.credits}
            required
            min="0"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration *</label>
          <input
            type="text"
            name="duration"
            defaultValue={initialData?.duration}
            required
            placeholder="e.g. 4 Years"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Instructor</label>
        <input
          type="text"
          name="instructor"
          defaultValue={initialData?.instructor}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mode *</label>
        <select
          name="mode"
          defaultValue={initialData?.mode}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">Select mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fee *</label>
        <input
          type="number"
          name="fee"
          defaultValue={initialData?.fee}
          required
          min="0"
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Prerequisites (comma-separated)</label>
        <input
          type="text"
          name="prerequisites"
          defaultValue={initialData?.prerequisites?.join(', ')}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Create'} Course
        </Button>
      </div>
    </form>
  );
};
