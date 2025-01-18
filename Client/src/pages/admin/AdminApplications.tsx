// src/pages/admin/AdminApplications.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CreateApplicationForm } from '../../features/admin/components/applications/CreateApplicationForm';
import { ApplicationList } from '../../features/admin/components/applications/ApplicationList';
import { ApplicationFilters } from '../../features/admin/components/applications/ApplicationFilters';
import { adminApi } from '../../features/admin/api/adminApi';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../../components/ui/Pagination';

import type { Application, ApplicationFilters as Filters } from '../../features/admin/types/application';

export const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: [],
    paymentStatus: [],
    dateRange: [null, null],
  });

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllApplications();
      setApplications(data.applications);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // In AdminApplications.tsx
const handleCreateApplication = async (data: any) => {
  try {
    await adminApi.createApplication(data);
    setShowCreateForm(false);
    fetchApplications(); // Refresh the list
  } catch (err) {
    console.error('Error creating application:', err);
    // Handle error (show error message)
  }
};


  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await adminApi.updateApplicationStatus(id, { status });
      fetchApplications();
    } catch (err) {
      console.error('Error updating application status:', err);
    }
  };

  const handleUpdatePayment = async (id: string, status: string, amount: number) => {
    try {
      await adminApi.updateApplicationStatus(id, { paymentStatus: status, amountPaid: amount });
      fetchApplications();
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      (app.visitorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (app.serviceId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesStatus = filters.status.length === 0 || 
      filters.status.includes(app.status);

    const matchesPayment = filters.paymentStatus.length === 0 || 
      filters.paymentStatus.includes(app.paymentStatus);

    const matchesDate = !filters.dateRange[0] || !filters.dateRange[1] ||
      (new Date(app.createdAt) >= filters.dateRange[0] && 
       new Date(app.createdAt) <= filters.dateRange[1]);

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Applications</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-5 w-5 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CreateApplicationForm
              onSubmit={handleCreateApplication}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <ApplicationFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <div className="col-span-9">
          <ApplicationList
            applications={filteredApplications}
            isLoading={loading}
            onUpdateStatus={handleUpdateStatus}
            onUpdatePayment={handleUpdatePayment}
            onViewDetails={(id) => console.log('View details:', id)}
          />
        </div>
      </div>
    </div>
  );
};
