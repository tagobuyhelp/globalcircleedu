import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../../ui/Button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-12">
      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
};