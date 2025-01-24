import React from 'react';
import { Card } from '../../../components/ui/Card';
import { RangeSlider } from '../../../components/ui/RangeSlider';
import { countries } from '../../../data/countries';

interface VisitorFilters {
  visitorType: ('Student' | 'Worker')[];
  country: string[];
  educationLevel: ('Intermediate' | 'Bachelor' | 'Masters')[];
  ageRange: [number, number];
  isConsultationBooked?: boolean;
}

interface VisitorFiltersProps {
  filters: VisitorFilters;
  onFilterChange: (filters: VisitorFilters) => void;
}

export const VisitorFilters: React.FC<VisitorFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Visitor Type</h4>
          <div className="space-y-2">
            {['Student', 'Worker'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.visitorType.includes(type as 'Student' | 'Worker')}
                  onChange={(e) => {
                    onFilterChange({
                      ...filters,
                      visitorType: e.target.checked
                        ? [...filters.visitorType, type as 'Student' | 'Worker']
                        : filters.visitorType.filter(t => t !== type)
                    });
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Country</h4>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {countries.map((country) => (
              <label key={country} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.country.includes(country)}
                  onChange={(e) => {
                    onFilterChange({
                      ...filters,
                      country: e.target.checked
                        ? [...filters.country, country]
                        : filters.country.filter(c => c !== country)
                    });
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{country}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Education Level</h4>
          <div className="space-y-2">
            {['Intermediate', 'Bachelor', 'Masters'].map((level) => (
              <label key={level} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.educationLevel.includes(level as any)}
                  onChange={(e) => {
                    onFilterChange({
                      ...filters,
                      educationLevel: e.target.checked
                        ? [...filters.educationLevel, level as any]
                        : filters.educationLevel.filter(l => l !== level)
                    });
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <RangeSlider
            label="Age Range"
            min={16}
            max={70}
            value={filters.ageRange}
            onChange={(value) => {
              onFilterChange({
                ...filters,
                ageRange: value as [number, number]
              });
            }}
            step={1}
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.isConsultationBooked}
              onChange={(e) => {
                onFilterChange({
                  ...filters,
                  isConsultationBooked: e.target.checked
                });
              }}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Has Booked Consultation</span>
          </label>
        </div>
      </div>
    </Card>
  );
};