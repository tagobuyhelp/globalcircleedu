import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface UniversityCardProps {
  university: {
    id: string;
    name: string;
    description?: string;
    image?: string;
  };
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">University Information</h3>
      <img
        src={university.image || 'https://images.unsplash.com/photo-1562774053-701939374585'}
        alt={university.name}
        className="w-full h-32 object-cover rounded-lg mb-4"
      />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {university.description || `${university.name} is a prestigious institution offering high-quality education and diverse academic programs.`}
      </p>
      <Link to={`/universities/${university.id}`}>
        <Button variant="outline" className="w-full mt-4">
          View University
        </Button>
      </Link>
    </Card>
  );
};