import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { VisitorCard } from '../../features/visitors/components/VisitorCard';
import { VisitorFilters } from '../../features/visitors/components/VisitorFilters';
import { VisitorDocumentsModal } from '../../features/visitors/components/VisitorDocumentsModal';
import { visitorApi } from '../../features/visitors/api/visitorApi';
import type { Visitor } from '../../features/visitors/types/visitor';

const initialFilters = {
  visitorType: [],
  country: [],
  educationLevel: [],
  ageRange: [16, 70],
  isConsultationBooked: undefined,
};

export const AdminVisitors = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [showDocuments, setShowDocuments] = useState(false);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const data = await visitorApi.getAll();
      console.log(data);
      setVisitors(data.visitors);
    } catch (err) {
      console.error('Error fetching visitors:', err);
      setError('Failed to load visitors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this visitor?')) return;
    try {
      await visitorApi.delete(id);
      fetchVisitors();
    } catch (err) {
      console.error('Error deleting visitor:', err);
    }
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = 
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm);

    const matchesType = filters.visitorType.length === 0 || 
      filters.visitorType.includes(visitor.visitorType);

    const matchesCountry = filters.country.length === 0 || 
      filters.country.includes(visitor.country);

    const matchesEducation = filters.educationLevel.length === 0 || 
      filters.educationLevel.includes(visitor.education.level);

    const matchesAge = visitor.age >= filters.ageRange[0] && 
      visitor.age <= filters.ageRange[1];

    const matchesConsultation = filters.isConsultationBooked === undefined || 
      visitor.isConsultationBooked === filters.isConsultationBooked;

    return matchesSearch && matchesType && matchesCountry && 
           matchesEducation && matchesAge && matchesConsultation;
  });

  if (loading) return <div>Loading visitors...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Visitors</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <Button 
            variant="outline"
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="lg:hidden"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Desktop Filters */}
        <div className="hidden lg:block col-span-3">
          <VisitorFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        {/* Visitor List */}
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-1 gap-6">
            {filteredVisitors.map((visitor) => (
              <VisitorCard
                key={visitor._id}
                visitor={visitor}
                onDelete={handleDelete}
                onViewDocuments={() => {
                  setSelectedVisitor(visitor);
                  setShowDocuments(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 p-6">
            <VisitorFilters
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setIsFilterDrawerOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocuments && selectedVisitor && (
        <VisitorDocumentsModal
          documents={selectedVisitor.documents}
          onClose={() => {
            setShowDocuments(false);
            setSelectedVisitor(null);
          }}
        />
      )}
    </div>
  );
};