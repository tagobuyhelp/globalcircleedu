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
      console.log('View Details clicked for university:', university._id);
      onViewDetails(university._id);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <img
  src={university.logo || 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b'}
  alt={university.name}
  className="w-full h-48 object-cover rounded-md"
/>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{university.name}</h3>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{university.location}, {university.country}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Trophy className="w-4 h-4 mr-2" />
            <span>Ranking: #{university.ranking}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            <span>{university.numberOfStudents.toLocaleString()} Students</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Est. {new Date(university.established).getFullYear()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Percent className="w-4 h-4 mr-2" />
            <span>{university.acceptanceRate}% Acceptance Rate</span>
          </div>
        </div>

        <div className="mt-4">
          <Button 
            className="w-full"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};