import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/layout/Footer';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { UniversityGrid } from '../../features/universities/components/UniversityGrid';
import { UniversityFilters } from '../../features/universities/components/UniversityFilters';
import { useFilters } from '../../hooks/useFilters';
import { useViewToggle } from '../../hooks/useViewToggle';
import { universityApi } from '../../features/universities/api/universityApi';
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

  const handleUniversitySelect = (id: string) => {
    console.log('Navigating to university:', id);
    navigate(`/universities/${id}`);
  };

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

  if (loading) return <LoadingSpinner message="Loading universities..." />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Universities</h1>
          
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 dark:bg-gray-700 dark:border-gray-600"
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
            <UniversityFilters
              isOpen={false}
              onClose={() => {}}
              filters={filters}
              onFilterChange={updateFilters}
            />
          </div>

          {/* University Grid */}
          <div className="col-span-12 lg:col-span-9">
            <UniversityGrid
              universities={filteredUniversities}
              view={view}
              onViewChange={toggleView}
              onSelect={handleUniversitySelect}
            />
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
      </div>
      <Footer />
    </>
  );
};