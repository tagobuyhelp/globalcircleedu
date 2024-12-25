import React from 'react';
import { FilterDrawer } from '../../../components/ui/FilterDrawer';
import { RangeSlider } from '../../../components/ui/RangeSlider';
import { Card } from '../../../components/ui/Card';
import { countries } from '../../../data/countries';

interface UniversityFilters {
  country: string[];
  type: string[];
  ranking: [number, number];
  acceptanceRate: [number, number];
}

interface UniversityFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: UniversityFilters;
  onFilterChange: (filters: UniversityFilters) => void;
}

export const UniversityFilters: React.FC<UniversityFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  const [tempFilters, setTempFilters] = React.useState(filters);

  const handleApply = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: UniversityFilters = {
      country: [],
      type: [],
      ranking: [0, 1000],
      acceptanceRate: [0, 100],
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
        <h4 className="text-sm font-medium mb-2">University Type</h4>
        <div className="space-y-2">
          {['Public', 'Private'].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={tempFilters.type.includes(type)}
                onChange={(e) => {
                  setTempFilters(prev => ({
                    ...prev,
                    type: e.target.checked
                      ? [...prev.type, type]
                      : prev.type.filter(t => t !== type)
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
          label="University Ranking"
          min={0}
          max={1000}
          value={tempFilters.ranking}
          onChange={(value) => {
            setTempFilters(prev => ({
              ...prev,
              ranking: value
            }));
          }}
          step={10}
        />
      </div>

      <div>
        <RangeSlider
          label="Acceptance Rate (%)"
          min={0}
          max={100}
          value={tempFilters.acceptanceRate}
          onChange={(value) => {
            setTempFilters(prev => ({
              ...prev,
              acceptanceRate: value
            }));
          }}
          step={5}
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