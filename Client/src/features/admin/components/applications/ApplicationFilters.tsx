import React from 'react';
import { Card } from '../../../../components/ui/Card';
import type { ApplicationFilters } from '../../types/application';

interface ApplicationFiltersProps {
  filters: ApplicationFilters;
  onFilterChange: (filters: ApplicationFilters) => void;
}

export const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
  const paymentOptions = ['Pending', 'Partial', 'Completed'];

  return (
    <Card className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Application Status</h3>
        {statusOptions.map((status) => (
          <label key={status} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filters.status?.includes(status)}
              onChange={(e) => {
                const newStatus = e.target.checked
                  ? [...(filters.status || []), status]
                  : (filters.status || []).filter(s => s !== status);
                onFilterChange({ ...filters, status: newStatus });
              }}
              className="rounded border-gray-300"
            />
            <span className="text-sm">{status}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Payment Status</h3>
        {paymentOptions.map((status) => (
          <label key={status} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filters.paymentStatus?.includes(status)}
              onChange={(e) => {
                const newStatus = e.target.checked
                  ? [...(filters.paymentStatus || []), status]
                  : (filters.paymentStatus || []).filter(s => s !== status);
                onFilterChange({ ...filters, paymentStatus: newStatus });
              }}
              className="rounded border-gray-300"
            />
            <span className="text-sm">{status}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Date Range</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Start Date</label>
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => {
                onFilterChange({
                  ...filters,
                  startDate: e.target.value || undefined
                });
              }}
              className="w-full p-2 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">End Date</label>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => {
                onFilterChange({
                  ...filters,
                  endDate: e.target.value || undefined
                });
              }}
              className="w-full p-2 border rounded-lg text-sm"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
