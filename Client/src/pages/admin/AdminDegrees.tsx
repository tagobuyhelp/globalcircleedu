import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DegreeForm } from '../../features/degrees/components/DegreeForm';
import { degreeApi } from '../../features/degrees/api/degreeApi';
import type { Degree } from '../../features/degrees/types/degree';

export const AdminDegrees = () => {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);

  useEffect(() => {
    fetchDegrees();
  }, []);

  const fetchDegrees = async () => {
    try {
      setLoading(true);
      const data = await degreeApi.getAll();
      setDegrees(data);
    } catch (err) {
      console.error('Error fetching degrees:', err);
      setError('Failed to load degrees');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<Degree, '_id'>) => {
    try {
      await degreeApi.create(data);
      setIsFormOpen(false);
      fetchDegrees();
    } catch (err) {
      console.error('Error creating degree:', err);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Degree>) => {
    try {
      await degreeApi.update(id, data);
      setIsFormOpen(false);
      setSelectedDegree(null);
      fetchDegrees();
    } catch (err) {
      console.error('Error updating degree:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this degree?')) return;
    try {
      await degreeApi.delete(id);
      fetchDegrees();
    } catch (err) {
      console.error('Error deleting degree:', err);
    }
  };

  const filteredDegrees = degrees.filter(degree =>
    degree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    degree.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading degrees...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Degrees</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search degrees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add Degree
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDegrees.map((degree) => (
          <Card key={degree._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{degree.name}</h3>
                {degree.abbreviation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {degree.abbreviation}
                  </p>
                )}
                {degree.description && (
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {degree.description}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDegree(degree);
                    setIsFormOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(degree._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <DegreeForm
          degree={selectedDegree}
          onSubmit={selectedDegree ? 
            (data) => handleUpdate(selectedDegree._id, data) : 
            handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedDegree(null);
          }}
        />
      )}
    </div>
  );
};