// src/pages/admin/AdminJobs.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { JobCard } from '../../features/jobs/components/AdminJobCard';
import { JobForm } from '../../features/jobs/components/JobForm';
import { jobApi } from '../../features/jobs/api/jobApi';
import type { Job } from '../../features/jobs/types/job';

export const AdminJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobApi.getAll();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<Job, '_id'>) => {
    try {
      await jobApi.create(data);
      setIsFormOpen(false);
      fetchJobs();
    } catch (err) {
      console.error('Error creating job:', err);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Job>) => {
    try {
      await jobApi.update(id, data);
      setIsFormOpen(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      console.error('Error updating job:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await jobApi.delete(id);
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onEdit={(job) => {
              setSelectedJob(job);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isFormOpen && (
        <JobForm
          job={selectedJob}
          onSubmit={selectedJob ? 
            (data) => handleUpdate(selectedJob._id, data) : 
            handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
};
