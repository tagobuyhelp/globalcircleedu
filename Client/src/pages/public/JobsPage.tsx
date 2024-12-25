import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/layout/Footer';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { JobGrid } from '../../features/jobs/components/JobGrid';
import { JobFilters } from '../../features/jobs/components/JobFilters';
import { useFilters } from '../../hooks/useFilters';
import { useViewToggle } from '../../hooks/useViewToggle';
import { jobApi } from '../../features/jobs/api/jobApi';
import type { Job } from '../../features/jobs/types/job';

const initialFilters = {
  jobType: [],
  country: [],
  experience: [0, 20],
  salary: [0, 200000],
};

export const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { view, toggleView } = useViewToggle();
  const { 
    filters, 
    updateFilters, 
    isFilterDrawerOpen, 
    openFilterDrawer, 
    closeFilterDrawer 
  } = useFilters(initialFilters);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobApi.getAll();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.jobType.length === 0 || 
                       filters.jobType.includes(job.jobType);
    
    const matchesCountry = filters.country.length === 0 || 
                          filters.country.includes(job.country);
    
    // Add more filter conditions as needed

    return matchesSearch && matchesType && matchesCountry;
  });

  if (loading) return <LoadingSpinner message="Loading jobs..." />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Job Opportunities</h1>
          
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
            
            <Button onClick={openFilterDrawer} className="lg:hidden">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block col-span-3">
            <JobFilters
              isOpen={false}
              onClose={() => {}}
              filters={filters}
              onFilterChange={updateFilters}
            />
          </div>

          {/* Job Grid */}
          <div className="col-span-12 lg:col-span-9">
            <JobGrid
              jobs={filteredJobs}
              view={view}
              onViewChange={toggleView}
              onApply={(jobId) => console.log('Applying for job:', jobId)}
            />
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        {isFilterDrawerOpen && (
          <JobFilters
            isOpen={true}
            onClose={closeFilterDrawer}
            filters={filters}
            onFilterChange={updateFilters}
          />
        )}
      </div>
      <Footer />
    </>
  );
};