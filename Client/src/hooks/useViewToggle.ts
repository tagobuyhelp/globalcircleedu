import { useState } from 'react';

export function useViewToggle(defaultView: 'grid' | 'list' = 'grid') {
  const [view, setView] = useState<'grid' | 'list'>(defaultView);

  const toggleView = (newView: 'grid' | 'list') => {
    setView(newView);
  };

  return {
    view,
    toggleView,
    isGridView: view === 'grid',
    isListView: view === 'list',
  };
}