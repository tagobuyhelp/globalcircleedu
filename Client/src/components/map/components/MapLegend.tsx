import React from 'react';
import { Globe2 } from 'lucide-react';

export const MapLegend = () => {
  return (
    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-3">
      <div className="flex items-center space-x-2">
        <Globe2 className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          Global Presence
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
        Click on a location for details
      </div>
    </div>
  );
};