import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ServiceForm } from '../../features/services/components/ServiceForm';
import { serviceApi } from '../../features/services/api/serviceApi';
import type { Service } from '../../features/services/types/service';

export const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceApi.getAll();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<Service, '_id'>) => {
    try {
      await serviceApi.create(data);
      setIsFormOpen(false);
      fetchServices();
    } catch (err) {
      console.error('Error creating service:', err);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Service>) => {
    try {
      await serviceApi.update(id, data);
      setIsFormOpen(false);
      setSelectedService(null);
      fetchServices();
    } catch (err) {
      console.error('Error updating service:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await serviceApi.delete(id);
      fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading services...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {service.description}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm">Type: {service.type}</p>
                  <p className="text-sm">Commission: {service.commissionRate}%</p>
                  <div className="text-sm">
                    <p className="font-medium">Fees:</p>
                    <ul className="ml-4 list-disc">
                      {service.fees.map((fee, index) => (
                        <li key={index}>
                          {fee.name}: ${fee.amount}
                          {fee.isOptional && ' (Optional)'}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedService(service);
                    setIsFormOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(service._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <ServiceForm
          service={selectedService}
          onSubmit={selectedService ? 
            (data) => handleUpdate(selectedService._id, data) : 
            handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
};