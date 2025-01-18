// src/features/programs/components/ProgramForm.tsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { getUniversityOptions } from '../../universities/api/universityApi';
import { getDegreeOptions } from '../../degrees/api/degreeApi';
import type { Program } from '../types/program';

interface ProgramFormProps {
  program?: Program | null;
  onSubmit: (data: Omit<Program, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onClose: () => void;
}

export const ProgramForm: React.FC<ProgramFormProps> = ({
  program,
  onSubmit,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState<Array<{ value: string; label: string }>>([]);
  const [degrees, setDegrees] = useState<Array<{ value: string; label: string }>>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [uniOptions, degreeOptions] = await Promise.all([
          getUniversityOptions(),
          getDegreeOptions()
        ]);
        setUniversities(uniOptions);
        setDegrees(degreeOptions);
      } catch (err) {
        console.error('Error fetching options:', err);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      duration: formData.get('duration') as string,
      fee: Number(formData.get('fee')),
      degree: formData.get('degree') as string,
      university: formData.get('university') as string,
      prerequisites: (formData.get('prerequisites') as string)
        .split('\n')
        .filter(Boolean),
      availableSeats: Number(formData.get('availableSeats')),
      applicationDeadline: formData.get('applicationDeadline') as string,
    };

    try {
      await onSubmit(data);
      onClose();
    } catch (err) {
      console.error('Form submission error:', err);
      setErrors({
        submit: 'Failed to save program. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {program ? 'Edit Program' : 'Add Program'}
          </h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Program Name</label>
            <input
              type="text"
              name="name"
              defaultValue={program?.name}
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={program?.description}
              rows={3}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              name="university"
              label="University"
              options={universities}
              defaultValue={program?.university._id}
              required
              error={errors.university}
            />

            <Select
              name="degree"
              label="Degree"
              options={degrees}
              defaultValue={program?.degree._id}
              required
              error={errors.degree}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                defaultValue={program?.duration}
                required
                placeholder="e.g. 4 Years"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fee</label>
              <input
                type="number"
                name="fee"
                defaultValue={program?.fee}
                required
                min="0"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prerequisites (one per line)</label>
            <textarea
              name="prerequisites"
              defaultValue={program?.prerequisites.join('\n')}
              rows={4}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Available Seats</label>
              <input
                type="number"
                name="availableSeats"
                defaultValue={program?.availableSeats}
                required
                min="0"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                defaultValue={program?.applicationDeadline ? 
                  new Date(program.applicationDeadline).toISOString().split('T')[0] : 
                  undefined}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : program ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
