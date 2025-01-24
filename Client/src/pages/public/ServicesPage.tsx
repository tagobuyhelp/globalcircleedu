import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, GraduationCap, Briefcase, Globe2, DollarSign } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/layout/Footer';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { serviceApi } from '../../features/services/api/serviceApi';
import type { Service } from '../../features/services/types/service';

export const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
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

    fetchServices();
  }, []);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'Study Abroad':
        return GraduationCap;
      case 'Job Placement':
        return Briefcase;
      case 'All':
        return Globe2;
      default:
        return DollarSign;
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || service.type === selectedType;
    return matchesSearch && matchesType && service.isActive;
  });

  if (loading) return <LoadingSpinner message="Loading services..." />;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <>
      <Helmet>
        <title>Our Services | Global Circle Edu</title>
        <meta name="description" content="Explore our comprehensive range of educational and career services designed to help you achieve your international goals." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions for your international education and career journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            {['All', 'Study Abroad', 'Job Placement', 'Other'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'primary' : 'outline'}
                onClick={() => setSelectedType(selectedType === type ? '' : type)}
                className="whitespace-nowrap"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = getServiceIcon(service.type);
            return (
              <Card key={service._id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    service.type === 'Study Abroad' 
                      ? 'bg-[#004e9a]/10 text-[#004e9a]' 
                      : 'bg-[#f37021]/10 text-[#f37021]'
                  }`}>
                    {service.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Fees:</h4>
                  {service.fees.map((fee, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {fee.name}
                        {fee.isOptional && ' (Optional)'}
                      </span>
                      <span className="font-medium">${fee.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

              </Card>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No services found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};