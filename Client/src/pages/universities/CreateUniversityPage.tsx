import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { CreateUniversityForm } from '../../features/universities/components/CreateUniversityForm';
import { universityApi } from '../../features/universities/api/universityApi';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export const CreateUniversityPage = () => {
  const navigate = useNavigate();
  const { error, handleError } = useErrorHandler();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await universityApi.create(data);
      navigate('/universities');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New University</h1>
      
      <Card className="p-6">
        <CreateUniversityForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </Card>
    </div>
  );
};