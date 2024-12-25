import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { UniversityHeader } from '../../features/universities/components/UniversityHeader';
import { UniversityStats } from '../../features/universities/components/UniversityStats';
import { UniversityCampus } from '../../features/universities/components/UniversityCampus';
import { ProgramList } from '../../features/universities/components/ProgramList';
import { universityApi } from '../../features/universities/api/universityApi';

export const UniversityPage = () => {
  const { id } = useParams<{ id: string }>();
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        if (!id) {
          setError('University not found');
          return;
        }
        const response = await universityApi.getById(id);
        setUniversity(response.data);
      } catch (err) {
        console.error('Error fetching university:', err);
        setError('Failed to load university details');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading university details..." />;
  if (error || !university) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'University not found'}</p>
        <Link to="/universities" className="text-blue-600 hover:text-blue-700">
          Back to Universities
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${university.name} | Global Circle Edu`}</title>
        <meta name="description" content={university.description || `Learn about programs and courses offered at ${university.name}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/universities" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Universities
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <UniversityHeader university={university} />
            <UniversityStats university={university} />
            <ProgramList programs={university.programs} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UniversityCampus university={university} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};