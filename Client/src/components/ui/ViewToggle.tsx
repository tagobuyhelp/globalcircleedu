import React from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from './Button';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={view === 'grid' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onViewChange('grid')}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === 'list' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onViewChange('list')}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};