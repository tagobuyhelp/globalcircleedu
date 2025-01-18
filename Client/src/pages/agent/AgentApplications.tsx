import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { agentApi } from '../../features/agent/api/agentApi';
import toast from 'react-hot-toast';
import type { Application } from '../../features/agent/types';

export const AgentApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchApplications();
  }, [currentPage]);

  const fetchApplications = async () => {
    try {
      const response = await agentApi.getApplications(currentPage);
      setApplications(response.applications);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Error fetching applications:', err);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await agentApi.updateApplication(id, status);
      toast.success('Application status updated');
      fetchApplications();
    } catch (err) {
      console.error('Error updating application:', err);
      toast.error('Failed to update application status');
    }
  };

  const filteredApplications = applications.filter(app =>
    app.visitorId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.visitorId.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Applications</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      {loading ? (
        <div>Loading applications...</div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application._id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{application.visitorId.name}</h3>
                  <p className="text-sm text-gray-600">{application.visitorId.email}</p>
                  <div className="mt-4 space-y-2">
                    {application.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        <div>
                          <p className="font-medium">{service.serviceId.name}</p>
                          <p className="text-sm text-gray-600">
                            Commission: ${service.commissionAmount}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <select
                            value={service.status}
                            onChange={(e) => handleStatusUpdate(application._id, e.target.value)}
                            className="p-1 border rounded"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            service.paymentStatus === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {service.paymentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(application.createdAt).toLocaleDateString()}
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
    </div>
  );
};