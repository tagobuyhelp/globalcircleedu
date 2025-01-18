// src/pages/admin/AdminPrograms.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgramForm } from '../../features/programs/components/ProgramForm';
import { programApi } from '../../features/programs/api/programApi';
import type { Program } from '../../features/programs/types/program';

export const AdminPrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const data = await programApi.getAll();
      setPrograms(data);
    } catch (err) {
      console.error('Error fetching programs:', err);
      setError('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<Program, '_id'>) => {
    try {
      await programApi.create(data);
      setIsFormOpen(false);
      fetchPrograms();
    } catch (err) {
      console.error('Error creating program:', err);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Program>) => {
    try {
      await programApi.update(id, data);
      setIsFormOpen(false);
      setSelectedProgram(null);
      fetchPrograms();
    } catch (err) {
      console.error('Error updating program:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    try {
      await programApi.delete(id);
      fetchPrograms();
    } catch (err) {
      console.error('Error deleting program:', err);
    }
  };

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading programs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Programs</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add Program
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{program.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {program.university.name}
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">Duration: {program.duration}</p>
                  <p className="text-sm">Fee: ${program.fee.toLocaleString()}</p>
                  <p className="text-sm">Seats: {program.availableSeats}</p>
                  <p className="text-sm">
                    Deadline: {program.applicationDeadline ? 
                      new Date(program.applicationDeadline).toLocaleDateString() : 
                      'Not set'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedProgram(program);
                    setIsFormOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(program._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <ProgramForm
          program={selectedProgram}
          onSubmit={selectedProgram ? 
            (data) => handleUpdate(selectedProgram._id, data) : 
            handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedProgram(null);
          }}
          universities={[]} // Add universities data
          degrees={[]} // Add degrees data
        />
      )}
    </div>
  );
};
