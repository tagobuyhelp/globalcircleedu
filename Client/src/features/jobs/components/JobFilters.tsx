import React from 'react';
import { FilterDrawer } from '../../../components/ui/FilterDrawer';
import { RangeSlider } from '../../../components/ui/RangeSlider';
import { Card } from '../../../components/ui/Card';
import { countries } from '../../../data/countries';

interface JobFilters {
  jobType: string[];
  country: string[];
  experience: [number, number];
  salary: [number, number];
}

interface JobFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  const [tempFilters, setTempFilters] = React.useState(filters);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  const handleApply = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: JobFilters = {
      jobType: [],
      country: [],
      experience: [0, 20],
      salary: [0, 200000],
    };
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Country</h4>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {countries.map((country) => (
            <label key={country} className="flex items-center space-x-2">
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
        <h4 className="text-sm font-medium mb-2">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={tempFilters.jobType.includes(type)}
                onChange={(e) => {
                  setTempFilters(prev => ({
                    ...prev,
                    jobType: e.target.checked
                      ? [...prev.jobType, type]
                      : prev.jobType.filter(t => t !== type)
                  }));
                }}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <RangeSlider
          label="Experience (years)"
          min={0}
          max={20}
          value={tempFilters.experience}
          onChange={(value) => {
            setTempFilters(prev => ({
              ...prev,
              experience: value
            }));
          }}
          step={1}
        />
      </div>

      <div>
        <RangeSlider
          label="Salary Range ($/year)"
          min={0}
          max={200000}
          value={tempFilters.salary}
          onChange={(value) => {
            setTempFilters(prev => ({
              ...prev,
              salary: value
            }));
          }}
          step={5000}
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </Card>
  );
};