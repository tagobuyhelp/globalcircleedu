import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { FileUpload } from '../ui/FileUpload';
import { countries } from '../../data/countries';
import { 
  Camera, User, Mail, Phone, MessageSquare, Globe, 
  UserCircle, Calendar, MapPin, Building2, GraduationCap,
  Briefcase, Percent, FileText, Upload, BookOpen
} from 'lucide-react';

interface VisitorProfileFormProps {
  visitorType: 'Student' | 'Worker';
  onSubmit: (data: FormData) => Promise<void>;
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
    defaultValues: {
      ...initialData,
      // Parse nested JSON objects if they're strings
      address: typeof initialData?.address === 'string' ? 
        JSON.parse(initialData.address) : initialData?.address,
      education: typeof initialData?.education === 'string' ? 
        JSON.parse(initialData.education) : initialData?.education,
      professional: typeof initialData?.professional === 'string' ? 
        JSON.parse(initialData.professional) : initialData?.professional
    }
  });

  const [documents, setDocuments] = useState<Record<string, File>>({});
const [profilePicture, setProfilePicture] = useState<File | null>(null);
const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.profilePicture || null);

const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
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
  try {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(data).forEach(key => {
      if (key !== 'documents' && key !== 'education' && key !== 'professional' && key !== 'address') {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
    });

    // Append nested objects as JSON strings
    if (data.address) {
      formData.append('address', JSON.stringify(data.address));
    }
    if (data.education) {
      formData.append('education', JSON.stringify(data.education));
    }
    if (data.professional) {
      formData.append('professional', JSON.stringify(data.professional));
    }

    // Append profile picture if changed
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    // Append documents
    Object.entries(documents).forEach(([key, file]) => {
      formData.append(`documents.${key}`, file);
    });

    await onSubmit(formData);
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};


const inputClasses = "w-full h-11 pl-10 pr-4 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors";
const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";
const inputWrapperClasses = "relative flex-1";
const iconClasses = "absolute left-3 top-3.5 h-4 w-4 text-gray-400";


  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Profile Picture Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <label 
            htmlFor="profile-picture"
            className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Camera className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Full Name</label>
          <div className={inputWrapperClasses}>
            <User className={iconClasses} />
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={inputClasses}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Email</label>
          <div className={inputWrapperClasses}>
            <Mail className={iconClasses} />
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className={inputClasses}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Phone</label>
          <div className={inputWrapperClasses}>
            <Phone className={iconClasses} />
            <input
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              className={inputClasses}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>WhatsApp</label>
          <div className={inputWrapperClasses}>
            <MessageSquare className={iconClasses} />
            <input
              type="tel"
              {...register('whatsapp')}
              className={inputClasses}
              placeholder="Enter your WhatsApp number"
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Country</label>
          <div className={inputWrapperClasses}>
            <Globe className={iconClasses} />
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
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country.message as string}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Gender</label>
          <div className={inputWrapperClasses}>
            <UserCircle className={iconClasses} />
            <select
              {...register('gender')}
              className={inputClasses}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Age</label>
          <div className={inputWrapperClasses}>
            <Calendar className={iconClasses} />
            <input
              type="number"
              {...register('age')}
              className={inputClasses}
              min="16"
              max="100"
              placeholder="Enter your age"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClasses}>Street</label>
            <div className={inputWrapperClasses}>
              <Building2 className={iconClasses} />
              <input
                type="text"
                {...register('address.street', { required: 'Street is required' })}
                className={inputClasses}
                placeholder="Enter street address"
              />
            </div>
          </div>
          
          {/* Add similar icon wrappers for other address fields */}
          {/* City, State/Province, Zip/Postal Code */}
        </div>
      </div>

      {/* Education */}
<div>
  <h3 className="text-lg font-medium mb-4 flex items-center">
    <GraduationCap className="w-5 h-5 mr-2" />
    Education
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className={labelClasses}>Level</label>
      <div className={inputWrapperClasses}>
        <GraduationCap className={iconClasses} />
        <select
          {...register('education.level', { required: 'Education level is required' })}
          className={inputClasses}
        >
          <option value="">Select level</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>
      </div>
      {errors.education?.level && (
        <p className="mt-1 text-sm text-red-600">{errors.education.level.message as string}</p>
      )}
    </div>

    <div>
      <label className={labelClasses}>Institution</label>
      <div className={inputWrapperClasses}>
        <Building2 className={iconClasses} />
        <input
          type="text"
          {...register('education.institution', { required: 'Institution is required' })}
          className={inputClasses}
          placeholder="Enter institution name"
        />
      </div>
      {errors.education?.institution && (
        <p className="mt-1 text-sm text-red-600">{errors.education.institution.message as string}</p>
      )}
    </div>

    <div>
      <label className={labelClasses}>Field of Study</label>
      <div className={inputWrapperClasses}>
        <BookOpen className={iconClasses} />
        <input
          type="text"
          {...register('education.fieldOfStudy', { required: 'Field of study is required' })}
          className={inputClasses}
          placeholder="Enter field of study"
        />
      </div>
      {errors.education?.fieldOfStudy && (
        <p className="mt-1 text-sm text-red-600">{errors.education.fieldOfStudy.message as string}</p>
      )}
    </div>

    <div>
      <label className={labelClasses}>Degree Name</label>
      <div className={inputWrapperClasses}>
        <FileText className={iconClasses} />
        <input
          type="text"
          {...register('education.degreeName', { required: 'Degree name is required' })}
          className={inputClasses}
          placeholder="Enter degree name"
        />
      </div>
      {errors.education?.degreeName && (
        <p className="mt-1 text-sm text-red-600">{errors.education.degreeName.message as string}</p>
      )}
    </div>

    <div>
      <label className={labelClasses}>GPA</label>
      <div className={inputWrapperClasses}>
        <Percent className={iconClasses} />
        <input
          type="number"
          step="0.01"
          {...register('education.score.gpa', { 
            required: 'GPA is required',
            min: { value: 0, message: 'GPA must be positive' },
            max: { value: 10, message: 'GPA cannot exceed 4.0' }
          })}
          className={inputClasses}
          placeholder="Enter GPA (e.g. 3.5)"
        />
      </div>
      {errors.education?.score?.gpa && (
        <p className="mt-1 text-sm text-red-600">{errors.education.score.gpa.message as string}</p>
      )}
    </div>

    <div>
      <label className={labelClasses}>Percentage</label>
      <div className={inputWrapperClasses}>
        <Percent className={iconClasses} />
        <input
          type="number"
          step="0.01"
          {...register('education.score.percentage', { 
            required: 'Percentage is required',
            min: { value: 0, message: 'Percentage must be positive' },
            max: { value: 100, message: 'Percentage cannot exceed 100' }
          })}
          className={inputClasses}
          placeholder="Enter percentage"
        />
      </div>
      {errors.education?.score?.percentage && (
        <p className="mt-1 text-sm text-red-600">{errors.education.score.percentage.message as string}</p>
      )}
    </div>
  </div>
</div>

{/* Professional Experience (Only for Workers) */}
{ (
  <div>
    <h3 className="text-lg font-medium mb-4 flex items-center">
      <Briefcase className="w-5 h-5 mr-2" />
      Professional Experience
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClasses}>Company Name</label>
        <div className={inputWrapperClasses}>
          <Building2 className={iconClasses} />
          <input
            type="text"
            {...register('professional.companyName', { required: 'Company name is required' })}
            className={inputClasses}
            placeholder="Enter company name"
          />
        </div>
        {errors.professional?.companyName && (
          <p className="mt-1 text-sm text-red-600">{errors.professional.companyName.message as string}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>Job Title</label>
        <div className={inputWrapperClasses}>
          <Briefcase className={iconClasses} />
          <input
            type="text"
            {...register('professional.jobTitle', { required: 'Job title is required' })}
            className={inputClasses}
            placeholder="Enter job title"
          />
        </div>
        {errors.professional?.jobTitle && (
          <p className="mt-1 text-sm text-red-600">{errors.professional.jobTitle.message as string}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>Years of Experience</label>
        <div className={inputWrapperClasses}>
          <Calendar className={iconClasses} />
          <input
            type="number"
            {...register('professional.yearsOfExperience', { 
              required: 'Years of experience is required',
              min: { value: 0, message: 'Years must be positive' }
            })}
            className={inputClasses}
            placeholder="Enter years of experience"
          />
        </div>
        {errors.professional?.yearsOfExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.professional.yearsOfExperience.message as string}</p>
        )}
      </div>
    </div>
  </div>
)}

      {/* Documents */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Required Documents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Identity Document"
            accept=".pdf,.jpg,.jpeg,.png"
            onFileSelect={(file) => handleFileSelect('identityDocument', file)}
            preview={initialData?.documents?.identityDocument?.fileURL}
            icon={Upload}
          />

          <FileUpload
            label="Academic Transcript"
            accept=".pdf"
            onFileSelect={(file) => handleFileSelect('transcript', file)}
            preview={initialData?.documents?.transcript?.fileURL}
            icon={Upload}
          />

          {visitorType === 'Worker' && (
            <FileUpload
              label="Work Experience Letter"
              accept=".pdf"
              onFileSelect={(file) => handleFileSelect('workExperience', file)}
              preview={initialData?.documents?.workExperience?.fileURL}
              icon={Upload}
            />
          )}

          <FileUpload
            label="Language Test Results"
            accept=".pdf"
            onFileSelect={(file) => handleFileSelect('languageTests', file)}
            preview={initialData?.documents?.languageTests?.fileURL}
            icon={Upload}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="min-w-[150px]"
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  );
};


