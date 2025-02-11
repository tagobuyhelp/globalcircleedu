import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Briefcase } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { JobGrid } from '../../features/jobs/components/JobGrid';
import { JobFilters } from '../../features/jobs/components/JobFilters';
import { Footer } from '../../components/layout/Footer';
import { jobApi } from '../../features/jobs/api/jobApi';
import { useFilters } from '../../hooks/useFilters';
import { useViewToggle } from '../../hooks/useViewToggle';
import type { Job } from '../../features/jobs/types/job';

const initialFilters = {
  jobType: [],
  country: [],
  experience: [0, 20],
  salary: [0, 200000],
};

export const JobsPage = () => {
  const navigate = useNavigate();
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

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.jobType.length === 0 || 
                       filters.jobType.includes(job.jobType);
    
    const matchesCountry = filters.country.length === 0 || 
                          filters.country.includes(job.country);
    
    const matchesSalary = parseInt(job.salary.replace(/[^0-9]/g, '')) >= filters.salary[0] && 
                         parseInt(job.salary.replace(/[^0-9]/g, '')) <= filters.salary[1];

    return matchesSearch && matchesType && matchesCountry && matchesSalary;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#004e9a] to-[#f37021] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <Briefcase className="w-16 h-16 mb-6" />
              <h1 className="text-4xl font-bold mb-4">Career Opportunities</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Discover exciting job opportunities worldwide and take the next step in your career
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <Button onClick={openFilterDrawer} className="w-full sm:w-auto lg:hidden">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block col-span-3">
              <div className="sticky top-8">
                <JobFilters
                  isOpen={false}
                  onClose={() => {}}
                  filters={filters}
                  onFilterChange={updateFilters}
                />
              </div>
            </div>

            {/* Job Grid */}
            <div className="col-span-12 lg:col-span-9">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No jobs found matching your criteria
                  </p>
                </div>
              ) : (
                <JobGrid
                  jobs={filteredJobs}
                  view={view}
                  onViewChange={toggleView}
                  onApply={(id) => navigate(`/jobs/${id}`)}
                />
              )}
            </div>
          </div>
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

      <Footer />
    </>
  );
};