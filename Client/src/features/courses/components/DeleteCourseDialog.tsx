import React from 'react';
import { Button } from '../../../components/ui/Button';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';

interface DeleteCourseDialogProps {
  courseName: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: any;
}

export const DeleteCourseDialog: React.FC<DeleteCourseDialogProps> = ({
  courseName,
  onConfirm,
  onCancel,
  isLoading,
  error,
}) => {
  return (
    <div className="p-6">
      {error && <ErrorMessage error={error} />}

      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Delete Course
      </h3>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Are you sure you want to delete "{courseName}"? This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end space-x-4">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          className="!text-red-600 !border-red-600 hover:!bg-red-50"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete Course'}
        </Button>
      </div>
    </div>
  );
};