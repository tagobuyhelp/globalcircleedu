import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
          {children}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white dark:bg-gray-800">
          <div className="flex space-x-4">
            <Button variant="outline" onClick={onReset} className="flex-1">
              Reset
            </Button>
            <Button onClick={onApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};