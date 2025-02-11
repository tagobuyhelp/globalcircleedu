import React from 'react';
import { FilterDrawer } from '../ui/FilterDrawer';
import { RangeSlider } from '../ui/RangeSlider';
import { Card } from '../ui/Card';

interface CourseFilters {
  degree: string[];
  program: string[];
  country: string[];
  mode: ('Online' | 'Offline' | 'Hybrid')[];
  feeRange: [number, number];
}

interface CourseFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: CourseFilters;
  onFilterChange: (filters: CourseFilters) => void;
  programs: string[];
  countries: string[];
  degrees: string[];
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  programs,
  countries,
  degrees,
}) => {
  const [tempFilters, setTempFilters] = React.useState(filters);

  const handleApply = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: CourseFilters = {
      degree: [],
      program: [],
      country: [],
      mode: [],
      feeRange: [0, 100000],
    };
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-4">Degree Level</h4>
        <div className="space-y-3">
          {degrees.map((degree) => (
            <label key={degree} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={tempFilters.degree.includes(degree)}
                onChange={(e) => {
                  setTempFilters(prev => ({
                    ...prev,
                    degree: e.target.checked
                      ? [...prev.degree, degree]
                      : prev.degree.filter(d => d !== degree)
                  }));
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{degree}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-4">Program</h4>
        <div className="max-h-48 overflow-y-auto space-y-3">
          {programs.map((program) => (
            <label key={program} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={tempFilters.program.includes(program)}
                onChange={(e) => {
                  setTempFilters(prev => ({
                    ...prev,
                    program: e.target.checked
                      ? [...prev.program, program]
                      : prev.program.filter(p => p !== program)
                  }));
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{program}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-4">Country</h4>
        <div className="max-h-48 overflow-y-auto space-y-3">
          {countries.map((country) => (
            <label key={country} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={tempFilters.country.includes(country)}
                onChange={(e) => {
                  setTempFilters(prev => ({
                    ...prev,
                    country: e.target.checked
                      ? [...prev.country, country]
                      : prev.country.filter(c => c !== country)
                  }));
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{country}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-4">Mode</h4>
        <div className="space-y-3">
          {['Online', 'Offline', 'Hybrid'].map((mode) => (
            <label key={mode} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={tempFilters.mode.includes(mode as any)}
                onChange={(e) => {
                  setTempFilters(prev => ({
                    ...prev,
                    mode: e.target.checked
                      ? [...prev.mode, mode as any]
                      : prev.mode.filter(m => m !== mode)
                  }));
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-4">Fee Range ($/yr)</h4>
        <RangeSlider
          min={0}
          max={100000}
          value={tempFilters.feeRange}
          onChange={(value) => {
            setTempFilters(prev => ({
              ...prev,
              feeRange: value as [number, number]
            }));
          }}
          step={1000}
        />
      </div>
    </div>
  );

  if (isOpen) {
    return (
      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        onApply={handleApply}
        onReset={handleReset}
      >
        <FilterContent />
      </FilterDrawer>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Reset All
        </button>
      </div>
      <FilterContent />
    </Card>
  );
};