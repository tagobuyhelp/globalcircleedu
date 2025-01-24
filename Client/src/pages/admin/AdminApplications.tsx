import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CreateApplicationForm } from '../../features/admin/components/applications/CreateApplicationForm';
import { ApplicationList } from '../../features/admin/components/applications/ApplicationList';
import { ApplicationFilters } from '../../features/admin/components/applications/ApplicationFilters';
import { ApplicationStats } from '../../features/admin/components/applications/ApplicationStats';
import { adminApi } from '../../features/admin/api/adminApi';
import { Pagination } from '../../components/ui/Pagination';
import toast from 'react-hot-toast';

import type { Application, ApplicationFilters as Filters } from '../../features/admin/types/application';

export const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [filters, setFilters] = useState<Filters>({
    status: [],
    paymentStatus: [],
    startDate: '',
    endDate: ''
  });

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllApplications({
        page: currentPage,
        ...filters,
        search: searchTerm
      });
      setApplications(data.applications);
      setTotalPages(data.pages);
      setStats(data.stats);
    } catch (err) {
      console.error('Error fetching applications:', err);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [currentPage, filters, searchTerm]);

  const handleCreateApplication = async (data: any) => {
    try {
      await adminApi.createApplication(data);
      setShowCreateForm(false);
      toast.success('Application created successfully');
      fetchApplications();
    } catch (err) {
      console.error('Error creating application:', err);
      toast.error('Failed to create application');
    }
  };

  const handleUpdateApplication = async (id: string, updates: any) => {
    try {
      await adminApi.updateApplication(id, updates);
      toast.success('Application updated successfully');
      fetchApplications();
    } catch (err) {
      console.error('Error updating application:', err);
      toast.error('Failed to update application');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-5 w-5 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      {/* Stats */}
      {stats && <ApplicationStats stats={stats} />}

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <div className={`${showFilters ? 'col-span-3' : 'hidden'}`}>
          <ApplicationFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        {/* Applications List */}
        <div className={`${showFilters ? 'col-span-9' : 'col-span-12'}`}>
          <ApplicationList
            applications={applications}
            isLoading={loading}
            onUpdateStatus={handleUpdateApplication}
          />

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Create Application Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CreateApplicationForm
              onSubmit={handleCreateApplication}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};