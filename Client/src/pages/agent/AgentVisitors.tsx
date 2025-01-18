import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CreateVisitorForm } from '../../features/agent/components/CreateVisitorForm';
import { agentApi } from '../../features/agent/api/agentApi';
import toast from 'react-hot-toast';
import type { Visitor } from '../../features/agent/types';

export const AgentVisitors = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVisitors();
  }, [currentPage]);

  const fetchVisitors = async () => {
    try {
      const response = await agentApi.getVisitors(currentPage);
      setVisitors(response.visitors);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Error fetching visitors:', err);
      toast.error('Failed to load visitors');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVisitor = async (data: Omit<Visitor, '_id' | 'createdBy' | 'createdAt'>) => {
    try {
      await agentApi.createVisitor(data);
      toast.success('Visitor created successfully');
      setShowCreateForm(false);
      fetchVisitors();
    } catch (err) {
      console.error('Error creating visitor:', err);
      toast.error('Failed to create visitor');
    }
  };

  const filteredVisitors = visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.phone.includes(searchTerm)
  );

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
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add Visitor
          </Button>
        </div>
      </div>

      {loading ? (
        <div>Loading visitors...</div>
      ) : (
        <div className="space-y-4">
          {filteredVisitors.map((visitor) => (
            <Card key={visitor._id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{visitor.name}</h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-600">{visitor.email}</p>
                    <p className="text-sm text-gray-600">{visitor.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Create Application
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Visitor Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Visitor</h2>
            <CreateVisitorForm onSubmit={handleCreateVisitor} />
            <Button 
              variant="outline" 
              onClick={() => setShowCreateForm(false)}
              className="mt-4 w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};