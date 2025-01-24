import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VisitorTypeSelection } from '../../components/auth/VisitorTypeSelection';
import { VisitorProfileForm } from '../../components/auth/VisitorProfileForm';
import { visitorApi } from '../../features/visitors/api/visitorApi';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [visitorType, setVisitorType] = useState<'Student' | 'Worker' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSubmit = async (data: any) => {
    if (!user?.id) {
      toast.error('User not found');
      return;
    }

    try {
      setIsLoading(true);
      await visitorApi.update(user.id, data);
      toast.success('Profile completed successfully');
      navigate('/dashboard/user');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!visitorType) {
    return <VisitorTypeSelection onSelect={setVisitorType} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
          <VisitorProfileForm
            visitorType={visitorType}
            onSubmit={handleProfileSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};