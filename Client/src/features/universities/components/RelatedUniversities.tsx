import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { universityApi } from '../api/universityApi';
import type { University } from '../types/university';

interface RelatedUniversitiesProps {
  country: string;
  currentId: string;
}

export const RelatedUniversities: React.FC<RelatedUniversitiesProps> = ({ country, currentId }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await universityApi.getRelated(country, currentId);
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching related universities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [country, currentId]);

  if (loading || universities.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Universities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {universities.map((university) => (
          <Link 
            key={university.id} 
            to={`/universities/${university.id}`}
            className="block hover:transform hover:scale-105 transition-transform duration-300"
          >
            <Card className="overflow-hidden">
              <img 
                src={university.logo || 'https://images.unsplash.com/photo-1562774053-701939374585'} 
                alt={university.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{university.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {university.location}, {university.country}
                </p>
                <div className="mt-2 text-sm">
                  <span className="text-blue-600 dark:text-blue-400">
                    Rank #{university.ranking}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};