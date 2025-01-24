import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { FileUpload } from '../../../components/ui/FileUpload';
import { countries } from '../../../data/countries';
import { courseApi } from '../../../features/courses/api/courseApi';
import { jobApi } from '../../../features/jobs/api/jobApi';
import { 
  User, Mail, Phone, MapPin, GraduationCap, 
  Briefcase, ChevronRight, ChevronLeft, BookOpen,
  Building2, Calendar, Globe, MessageSquare, Camera, FileText
} from 'lucide-react';

// Add interfaces for Course and Job
interface Course {
  _id: string;
  name: string;
  program: {
    university: {
      name: string;
    };
  };
}

interface Job {
  _id: string;
  title: string;
  company: string;
}

interface CreateVisitorFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export const CreateVisitorForm: React.FC<CreateVisitorFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Record<string, File>>({});
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<string>('');


  // Add useEffect to fetch courses and jobs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, jobsData] = await Promise.all([
          courseApi.getAll(),
          jobApi.getAll()
        ]);
        setCourses(coursesData);
        setJobs(jobsData);
      } catch (err) {
        console.error('Error fetching courses and jobs:', err);
      }
    };

    fetchData();
  }, []);
  
 const steps = [
  { title: 'Basic Info', icon: User },
  { title: 'Education', icon: GraduationCap },
  { title: 'Professional', icon: Briefcase },
  { title: 'Interests', icon: BookOpen },
  { title: 'Documents', icon: FileText }
];


  const handleProfilePictureChange = (file: File) => {
    setProfilePicture(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (fieldName: string, file: File) => {
    setDocuments(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onFormSubmit = async (data: any) => {
  const formData = new FormData();
  
  // Append basic info
  Object.keys(data).forEach(key => {
    if (data[key]) {
      if (key === 'education' || key === 'professional' || key === 'address') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  });

  // Append selected course/job
  if (selectedCourse) {
    formData.append('interestedCourse', selectedCourse);
  }
  if (selectedJob) {
    formData.append('interestedJob', selectedJob);
  }

  // Append profile picture
  if (profilePicture) {
    formData.append('profilePicture', profilePicture);
  }

  // Append documents
  Object.entries(documents).forEach(([key, file]) => {
    formData.append(`documents.${key}`, file);
  });

  try {
    await onSubmit(formData);
  } catch (error) {
    console.error('Form submission error:', error);
  }
};


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {profilePreview ? (
                    <img 
                      src={profilePreview} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleProfilePictureChange(file);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp</label>
                <input
                  type="tel"
                  {...register('whatsapp')}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <select
                  {...register('country', { required: 'Country is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-600 text-sm mt-1">{errors.country.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Visitor Type</label>
                <select
                  {...register('visitorType', { required: 'Visitor type is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select type</option>
                  <option value="Student">Student</option>
                  <option value="Worker">Worker</option>
                </select>
                {errors.visitorType && (
                  <p className="text-red-600 text-sm mt-1">{errors.visitorType.message as string}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Education Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Level</label>
                <select
                  {...register('education.level', { required: 'Education level is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Institution</label>
                <input
                  type="text"
                  {...register('education.institution', { required: 'Institution is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Field of Study</label>
                <input
                  type="text"
                  {...register('education.fieldOfStudy', { required: 'Field of study is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Degree Name</label>
                <input
                  type="text"
                  {...register('education.degreeName', { required: 'Degree name is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GPA</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('education.score.gpa', { required: 'GPA is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Percentage</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('education.score.percentage', { required: 'Percentage is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Year of Receiving</label>
                <input
                  type="number"
                  {...register('education.yearOfReceiving', { required: 'Year is required' })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Professional Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  {...register('professional.companyName')}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input
                  type="text"
                  {...register('professional.jobTitle')}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Years of Experience</label>
                <input
                  type="number"
                  {...register('professional.yearsOfExperience')}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        );

        case 4:
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Your Interests</h3>
      
      {/* Course Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Interested Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name} - {course.program.university.name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Selection - Only show for Worker type */}
      {watch('visitorType') === 'Worker' && (
        <div>
          <label className="block text-sm font-medium mb-1">Interested Job</label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select a job</option>
            {jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title} - {job.company}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );


      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Required Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Identity Document"
                accept=".pdf,.jpg,.jpeg,.png"
                onFileSelect={(file) => handleDocumentUpload('identityDocument', file)}
              />

              <FileUpload
                label="Academic Transcript"
                accept=".pdf"
                onFileSelect={(file) => handleDocumentUpload('transcript', file)}
              />

              {watch('visitorType') === 'Worker' && (
                <FileUpload
                  label="Work Experience Letter"
                  accept=".pdf"
                  onFileSelect={(file) => handleDocumentUpload('workExperience', file)}
                />
              )}

              <FileUpload
                label="Language Test Results"
                accept=".pdf"
                onFileSelect={(file) => handleDocumentUpload('languageTests', file)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-[40rem] mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  currentStep > index + 1
                    ? 'bg-green-500 text-white'
                    : currentStep === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {currentStep > index + 1 ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-2 transition-colors ${
                    currentStep > index + 1
                      ? 'bg-green-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-2xl mx-auto mt-2">
          {steps.map((step, index) => (
            <span
              key={index}
              className={`text-xs font-medium transition-colors ${
                currentStep === index + 1
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-4xl mx-auto">

        {renderStepContent()}

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Visitor'}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};