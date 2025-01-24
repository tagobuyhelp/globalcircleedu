import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { FileUpload } from '../ui/FileUpload';
import { countries } from '../../data/countries';
import { Camera } from 'lucide-react';

interface VisitorProfileFormProps {
  visitorType: 'Student' | 'Worker';
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  initialData?: any;
}

export const VisitorProfileForm: React.FC<VisitorProfileFormProps> = ({
  visitorType,
  onSubmit,
  isLoading,
  initialData
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });
  const [documents, setDocuments] = useState<Record<string, File>>({});
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.profilePicture || null);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (fieldName: string, file: File) => {
    setDocuments(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const onFormSubmit = async (data: any) => {
    const formData = new FormData();
    
    // Append profile picture if changed
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    // Append basic info
    Object.keys(data).forEach(key => {
      if (key !== 'documents' && key !== 'education' && key !== 'professional' && key !== 'address') {
        formData.append(key, data[key]);
      }
    });

    // Append nested objects as JSON strings
    formData.append('address', JSON.stringify(data.address));
    formData.append('education', JSON.stringify(data.education));
    formData.append('professional', JSON.stringify(data.professional));

    // Append documents
    Object.entries(documents).forEach(([key, file]) => {
      formData.append(`documents.${key}`, file);
    });

    await onSubmit(formData);
  };

  const inputClasses = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";
  const sectionClasses = "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4";

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Profile Picture */}
      <div className={sectionClasses}>
        <h3 className="text-lg font-semibold mb-6">Profile Picture</h3>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ring-4 ring-white dark:ring-gray-800 shadow-lg">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <label
              htmlFor="profile-picture"
              className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click the camera icon to update your profile picture
          </p>
        </div>
      </div>


      {/* Basic Information */}
      <div className={sectionClasses}>
        <h3 className="text-lg font-semibold mb-6">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Full Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={inputClasses}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
            )}
          </div>

          <div>
            <label className={labelClasses}>Country</label>
            <select
              {...register('country', { required: 'Country is required' })}
              className={inputClasses}
            >
              <option value="">Select country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Phone</label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              className={inputClasses}
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className={labelClasses}>WhatsApp</label>
            <input
              type="tel"
              {...register('whatsapp')}
              className={inputClasses}
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className={sectionClasses}>
        <h3 className="text-lg font-semibold mb-6">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClasses}>Street</label>
            <input
              type="text"
              {...register('address.street', { required: 'Street is required' })}
              className={inputClasses}
              placeholder="Enter street address"
            />
          </div>
          <div>
            <label className={labelClasses}>City</label>
            <input
              type="text"
              {...register('address.city', { required: 'City is required' })}
              className={inputClasses}
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className={labelClasses}>State/Province</label>
            <input
              type="text"
              {...register('address.state', { required: 'State is required' })}
              className={inputClasses}
              placeholder="Enter state/province"
            />
          </div>
          <div>
            <label className={labelClasses}>Zip/Postal Code</label>
            <input
              type="text"
              {...register('address.zipCode', { required: 'Zip code is required' })}
              className={inputClasses}
              placeholder="Enter postal code"
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className={sectionClasses}>
        <h3 className="text-lg font-semibold mb-6">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Level</label>
            <select
              {...register('education.level', { required: 'Level is required' })}
              className={inputClasses}
            >
              <option value="">Select level</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Institution</label>
            <input
              type="text"
              {...register('education.institution', { required: 'Institution is required' })}
              className={inputClasses}
              placeholder="Enter institution name"
            />
          </div>
          <div>
            <label className={labelClasses}>Field of Study</label>
            <input
              type="text"
              {...register('education.fieldOfStudy', { required: 'Field of study is required' })}
              className={inputClasses}
              placeholder="Enter field of study"
            />
          </div>
          <div>
            <label className={labelClasses}>Degree Name</label>
            <input
              type="text"
              {...register('education.degreeName', { required: 'Degree name is required' })}
              className={inputClasses}
              placeholder="Enter degree name"
            />
          </div>
          <div>
            <label className={labelClasses}>GPA</label>
            <input
              type="number"
              step="0.1"
              {...register('education.score.gpa', { required: 'GPA is required' })}
              className={inputClasses}
              placeholder="Enter GPA"
            />
          </div>
          <div>
            <label className={labelClasses}>Percentage</label>
            <input
              type="number"
              step="0.1"
              {...register('education.score.percentage', { required: 'Percentage is required' })}
              className={inputClasses}
              placeholder="Enter percentage"
            />
          </div>
        </div>
      </div>

      {/* Professional Experience (Only for Workers) */}
      {visitorType === 'Worker' && (
        <div className={sectionClasses}>
          <h3 className="text-lg font-semibold mb-6">Professional Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Company Name</label>
              <input
                type="text"
                {...register('professional.companyName', { required: 'Company name is required' })}
                className={inputClasses}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className={labelClasses}>Job Title</label>
              <input
                type="text"
                {...register('professional.jobTitle', { required: 'Job title is required' })}
                className={inputClasses}
                placeholder="Enter job title"
              />
            </div>
            <div>
              <label className={labelClasses}>Years of Experience</label>
              <input
                type="number"
                {...register('professional.yearsOfExperience', { required: 'Years of experience is required' })}
                className={inputClasses}
                placeholder="Enter years of experience"
              />
            </div>
          </div>
        </div>
      )}

      {/* Consultation Preferences */}
<div className={sectionClasses}>
  <h3 className="text-lg font-semibold mb-6">Consultation Preferences</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className={labelClasses}>Preferred Contact Method</label>
      <select
        {...register('preferredContact')}
        className={inputClasses}
      >
        <option value="">Select contact method</option>
        <option value="Phone">Phone</option>
        <option value="Email">Email</option>
        <option value="WhatsApp">WhatsApp</option>
      </select>
    </div>
    <div>
      <label className={labelClasses}>Preferred Consultation Date</label>
      <input
        type="date"
        {...register('preferredConsultationDate')}
        className={inputClasses}
        min={new Date().toISOString().split('T')[0]} // Only allow future dates
      />
    </div>
  </div>
</div>


      {/* Documents */}
      <div className={sectionClasses}>
        <h3 className="text-lg font-semibold mb-6">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Identity Document"
            accept=".pdf,.jpg,.jpeg,.png"
            onFileSelect={(file) => handleFileSelect('identityDocument', file)}
          />
          <FileUpload
            label="Academic Transcript"
            accept=".pdf"
            onFileSelect={(file) => handleFileSelect('transcript', file)}
          />
          {visitorType === 'Worker' && (
            <FileUpload
              label="Work Experience Letter"
              accept=".pdf"
              onFileSelect={(file) => handleFileSelect('workExperience', file)}
            />
          )}
          <FileUpload
            label="Language Test Results"
            accept=".pdf"
            onFileSelect={(file) => handleFileSelect('languageTests', file)}
          />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full md:w-auto px-8"
        >
          {isLoading ? 'Saving...' : 'Complete Profile'}
        </Button>
      </div>
    </form>
  );
};