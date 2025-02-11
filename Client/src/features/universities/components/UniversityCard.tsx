import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MapPin, Trophy, Users, Calendar, Percent } from 'lucide-react';
import type { University } from '../types/university';

interface UniversityCardProps {
  university: University;
  onViewDetails?: (id: string) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ 
  university, 
  onViewDetails 
}) => {
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onViewDetails && university._id) {
      onViewDetails(university._id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="relative h-48">
          <img
            src={university.logo || 'https://images.unsplash.com/photo-1562774053-701939374585'}
            alt={university.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {university.type}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{university.name}</h3>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{university.location}, {university.country}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm">
              <Trophy className="w-4 h-4 mr-2 text-blue-600" />
              <span>Rank #{university.ranking}</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              <span>{university.numberOfStudents.toLocaleString()} Students</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <span>Est. {new Date(university.established).getFullYear()}</span>
            </div>
            <div className="flex items-center text-sm">
              <Percent className="w-4 h-4 mr-2 text-blue-600" />
              <span>{university.acceptanceRate}% Acceptance</span>
            </div>
          </div>
          <Button onClick={handleViewDetails} className="w-full">
            View Details
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Image Container - 30% width */}
        <div className="w-[30%] relative">
          <img
            src={university.logo || 'https://images.unsplash.com/photo-1562774053-701939374585'}
            alt={university.name}
            className="w-full h-full object-cover rounded-l-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content Container - 70% width */}
        <div className="w-[70%] p-6 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{university.name}</h3>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{university.location}, {university.country}</span>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {university.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center text-sm">
                <Trophy className="w-4 h-4 mr-2 text-blue-600" />
                <span>Ranking: #{university.ranking}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                <span>{university.numberOfStudents.toLocaleString()} Students</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                <span>Est. {new Date(university.established).getFullYear()}</span>
              </div>
              <div className="flex items-center text-sm">
                <Percent className="w-4 h-4 mr-2 text-blue-600" />
                <span>{university.acceptanceRate}% Acceptance Rate</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleViewDetails} className="w-full">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};