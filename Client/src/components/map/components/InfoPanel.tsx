import React from 'react';
import { InfoPanelProps } from '../types';

export const InfoPanel: React.FC<InfoPanelProps> = ({ location, onClose }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {location.name}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ×
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300">Total Students</span>
          <span className="font-semibold">{location.students.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300">Universities</span>
          <span className="font-semibold">{location.universities}</span>
        </div>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};