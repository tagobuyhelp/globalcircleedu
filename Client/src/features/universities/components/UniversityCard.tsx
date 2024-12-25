import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MapPin, Trophy, Users, Calendar, Percent } from 'lucide-react';
import type { University } from '../types/university';

interface UniversityCardProps {
  university: University;
  onViewDetails?: (universityId: string) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ 
  university, 
  onViewDetails 
}) => {
  const handleCardClick = () => {
    console.log('Card clicked:', university._id);
    if (onViewDetails) {
      onViewDetails(university._id);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent propagation to the card's onClick
    console.log('Button clicked:', university._id);
    if (onViewDetails) {
      onViewDetails(university._id);
    }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleCardClick}
    >
      <img
        src={university.logo || 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b'}
        alt={university.name}
        className="w-full h-48 object-cover"
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
            onClick={handleButtonClick}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
