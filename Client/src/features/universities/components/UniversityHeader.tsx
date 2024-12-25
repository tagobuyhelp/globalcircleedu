import React from 'react';
import { MapPin, Calendar, Award } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type { University } from '../types/university';

interface UniversityHeaderProps {
  university: University;
}

export const UniversityHeader: React.FC<UniversityHeaderProps> = ({ university }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{university.name}</h1>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{university.location}, {university.country}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Est. {new Date(university.established).getFullYear()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Award className="w-5 h-5 mr-2" />
            <span>Rank #{university.ranking}</span>
          </div>
        </div>
      </div>

      <img
        src={university.logo || "https://images.unsplash.com/photo-1562774053-701939374585"}
        alt={university.name}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">About University</h2>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
          {university.description}
        </p>
      </Card>
    </div>
  );
};