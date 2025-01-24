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
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Degree Level</h4>
        <div className="max-h-48 overflow-y-auto">
          {degrees.map((degree) => (
            <label key={degree} className="flex items-center space-x-2 mb-2">
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
                className="rounded border-gray-300"
              />
              <span className="text-sm">{degree}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Program</h4>
        <div className="max-h-48 overflow-y-auto">
          {programs.map((program) => (
            <label key={program} className="flex items-center space-x-2 mb-2">
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
                className="rounded border-gray-300"
              />
              <span className="text-sm">{program}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Country</h4>
        <div className="max-h-48 overflow-y-auto">
          {countries.map((country) => (
            <label key={country} className="flex items-center space-x-2 mb-2">
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
                className="rounded border-gray-300"
              />
              <span className="text-sm">{country}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Mode</h4>
        {['Online', 'Offline', 'Hybrid'].map((mode) => (
          <label key={mode} className="flex items-center space-x-2 mb-2">
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
              className="rounded border-gray-300"
            />
            <span className="text-sm">{mode}</span>
          </label>
        ))}
      </div>

      <div>
        <RangeSlider
          label="Fee Range ($/yr)"
          min={0}
          max={100000}
          value={tempFilters.feeRange}
          onChange={(value) => {
            setTempFilters(prev => ({
              ...prev,
              feeRange: value
            }));
          }}
          step={1000}
        />
      </div>
    </div>
  );

  // For mobile drawer
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

  // For desktop sidebar
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Filters</h3>
      <FilterContent />
      <div className="mt-6 space-y-2">
        <button
          onClick={() => onFilterChange(tempFilters)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </Card>
  );
};