import { useState, useCallback } from 'react';

export function useFilters<T>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const updateFilters = useCallback((newFilters: T) => {
    setFilters(newFilters);
  }, []);

  const openFilterDrawer = useCallback(() => {
    setIsFilterDrawerOpen(true);
  }, []);

  const closeFilterDrawer = useCallback(() => {
    setIsFilterDrawerOpen(false);
  }, []);

  return {
    filters,
    updateFilters,
    isFilterDrawerOpen,
    openFilterDrawer,
    closeFilterDrawer,
  };
}