import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { UniversityForm } from '../../features/universities/components/UniversityForm';
import { universityApi } from '../../features/universities/api/universityApi';
import type { University } from '../../features/universities/types/university';

export const AdminUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  useEffect(() => {
    fetchUniversities();
  }, []);

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

  const handleCreate = async (formData: FormData) => {
    try {
      await universityApi.create(formData);
      setIsFormOpen(false);
      fetchUniversities();
    } catch (err) {
      console.error('Error creating university:', err);
    }
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    try {
      await universityApi.update(id, formData);
      setIsFormOpen(false);
      setSelectedUniversity(null);
      fetchUniversities();
    } catch (err) {
      console.error('Error updating university:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this university?')) return;
    try {
      await universityApi.delete(id);
      fetchUniversities();
    } catch (err) {
      console.error('Error deleting university:', err);
    }
  };

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading universities...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Universities</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add University
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <Card key={university._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{university.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {university.location}, {university.country}
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">Type: {university.type}</p>
                  <p className="text-sm">Ranking: #{university.ranking}</p>
                  <p className="text-sm">
                    Acceptance Rate: {university.acceptanceRate}%
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedUniversity(university);
                    setIsFormOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(university._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <UniversityForm
          university={selectedUniversity}
          onSubmit={selectedUniversity ? 
            (formData) => handleUpdate(selectedUniversity._id, formData) : 
            handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedUniversity(null);
          }}
        />
      )}
    </div>
  );
};