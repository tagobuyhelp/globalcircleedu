import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversityCard } from '../../features/universities/components/UniversityCard';
import { Button } from '../../components/ui/Button';
import { Search, Plus } from 'lucide-react';
import { universityApi } from '../../features/universities/api/universityApi';
import type { University } from '../../features/universities/types/university';

export const UniversitiesPage = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await universityApi.getAll();
        setUniversities(data);
      } catch (err) {
        console.error('Error fetching universities:', err);
        setError('Failed to load universities');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading universities...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
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
          
          <Button onClick={() => navigate('/universities/create')}>
            <Plus className="h-5 w-5 mr-2" />
            Add University
          </Button>
        </div>
      </div>

      {filteredUniversities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No universities found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((university) => (
            <UniversityCard
              key={university.id}
              university={university}
              onViewDetails={(id) => navigate(`/universities/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};