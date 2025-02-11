import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Building2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { UniversityGrid } from '../../features/universities/components/UniversityGrid';
import { UniversityFilters } from '../../features/universities/components/UniversityFilters';
import { Footer } from '../../components/layout/Footer';
import { universityApi } from '../../features/universities/api/universityApi';
import { useFilters } from '../../hooks/useFilters';
import { useViewToggle } from '../../hooks/useViewToggle';
import type { University } from '../../features/universities/types/university';

const initialFilters = {
  country: [],
  type: [],
  ranking: [0, 1000],
  acceptanceRate: [0, 100],
};

export const UniversitiesPage = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
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
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const data = await universityApi.getAll();
        setUniversities(data.universities);
      } catch (err) {
        console.error('Error fetching universities:', err);
        setError('Failed to load universities');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry = filters.country.length === 0 || 
                          filters.country.includes(university.country);
    
    const matchesType = filters.type.length === 0 || 
                       filters.type.includes(university.type);
    
    const matchesRanking = university.ranking >= filters.ranking[0] && 
                          university.ranking <= filters.ranking[1];
    
    const matchesAcceptance = university.acceptanceRate >= filters.acceptanceRate[0] && 
                             university.acceptanceRate <= filters.acceptanceRate[1];

    return matchesSearch && matchesCountry && matchesType && 
           matchesRanking && matchesAcceptance;
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
              <Building2 className="w-16 h-16 mb-6" />
              <h1 className="text-4xl font-bold mb-4">Partner Universities</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Discover prestigious universities worldwide offering high-quality education and excellent career prospects
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
                  placeholder="Search universities..."
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
                <UniversityFilters
                  isOpen={false}
                  onClose={() => {}}
                  filters={filters}
                  onFilterChange={updateFilters}
                />
              </div>
            </div>

            {/* University Grid */}
            <div className="col-span-12 lg:col-span-9">
              {filteredUniversities.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No universities found matching your criteria
                  </p>
                </div>
              ) : (
                <UniversityGrid
                  universities={filteredUniversities}
                  view={view}
                  onViewChange={toggleView}
                  onSelect={(id) => navigate(`/universities/${id}`)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isFilterDrawerOpen && (
        <UniversityFilters
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