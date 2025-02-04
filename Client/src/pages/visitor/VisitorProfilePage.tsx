import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { visitorApi } from '../../features/visitors/api/visitorApi';
import { VisitorProfileForm } from '../../components/auth/VisitorProfileForm';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Mail, Phone, MapPin, GraduationCap, Briefcase, 
  Edit2, Globe, ChevronLeft, User 
} from 'lucide-react';
import { parseJsonField } from '../../utils/parseJson';
import toast from 'react-hot-toast';

export const VisitorProfilePage = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.id) {
          setError('User not found');
          return;
        }
        const data = await visitorApi.getById(user.id);
        
        // Parse stringified JSON fields
        const parsedData = {
          ...data,
          address: parseJsonField(data.address),
          education: parseJsonField(data.education),
          professional: parseJsonField(data.professional)
        };
        
        setProfile(parsedData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const handleUpdate = async (formData: FormData) => {
    try {
      if (!user?.id) {
        toast.error('User not found');
        return;
      }
      
      const loadingToast = toast.loading('Updating profile...');
      
      await visitorApi.update(user.id, formData);
      
      toast.dismiss(loadingToast);
      toast.success('Profile updated successfully');
      
      setIsEditing(false);
      
      // Refresh profile data
      const updatedProfile = await visitorApi.getById(user.id);
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show profile creation form if no profile exists
  if (!profile || error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Please complete your profile to continue
            </p>
          </div>
          <VisitorProfileForm
            visitorType="Student"
            onSubmit={handleUpdate}
            isLoading={loading}
          />
        </Card>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Back to Home Button */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Link>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
          <VisitorProfileForm
            visitorType={profile.visitorType}
            onSubmit={handleUpdate}
            isLoading={loading}
            initialData={profile}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Back to Home Button */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Home
      </Link>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-500">
                  {profile.name?.[0]?.toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                profile.visitorType === 'Student'
                  ? 'bg-[#004e9a]/10 text-[#004e9a]'
                  : 'bg-[#f37021]/10 text-[#f37021]'
              }`}>
                {profile.visitorType}
              </span>
            </div>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span>
              {profile.address?.city}, {profile.address?.state}, {profile.country}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-400" />
            <span>WhatsApp: {profile.whatsapp}</span>
          </div>
        </div>
      </Card>

      {/* Education Details */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{profile.education?.institution}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {profile.education?.degreeName} in {profile.education?.fieldOfStudy}
            </p>
            <p className="text-sm text-gray-500">
              Level: {profile.education?.level} • GPA: {profile.education?.score?.gpa}
            </p>
          </div>
        </div>
      </Card>

      {/* Professional Experience */}
      {profile.professional?.companyName && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Professional Experience
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{profile.professional.jobTitle}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {profile.professional.companyName}
              </p>
              <p className="text-sm text-gray-500">
                {profile.professional.yearsOfExperience} years of experience
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Documents */}
      {profile.documents && Object.keys(profile.documents).length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profile.documents).map(([key, doc]: [string, any]) => (
              doc.fileURL && (
                <a
                  key={key}
                  href={doc.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-gray-500">{doc.documentType}</p>
                  </div>
                </a>
              )
            ))}
          </div>
        </Card>
      )}

      {/* Additional Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Preferred Contact</label>
              <p className="font-medium">{profile.preferredContact}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Gender</label>
              <p className="font-medium">{profile.gender}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Age</label>
              <p className="font-medium">{profile.age} years</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Consultation Status</label>
              <p className="font-medium">
                {profile.isConsultationBooked ? (
                  <span className="text-green-600">Booked</span>
                ) : (
                  <span className="text-yellow-600">Not Booked</span>
                )}
              </p>
            </div>
            {profile.preferredConsultationDate && (
              <div>
                <label className="text-sm text-gray-500">Preferred Consultation Date</label>
                <p className="font-medium">
                  {new Date(profile.preferredConsultationDate).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm text-gray-500">Referral Source</label>
              <p className="font-medium">{profile.referralSource}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};