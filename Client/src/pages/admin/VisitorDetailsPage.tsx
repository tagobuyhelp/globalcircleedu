import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Mail, Phone, MapPin, GraduationCap, 
  Briefcase, Calendar, Globe, MessageSquare, User,
  FileText, Clock, Building2, BookOpen, GraduationCap2
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { VisitorDocumentsModal } from '../../features/visitors/components/VisitorDocumentsModal';
import { visitorApi } from '../../features/visitors/api/visitorApi';

export const VisitorDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [visitor, setVisitor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDocuments, setShowDocuments] = useState(false);

  useEffect(() => {
    const fetchVisitor = async () => {
  try {
    if (!id) return;
    const response = await visitorApi.getById(id);
    // Set visitor directly from response since it already contains the visitor data
    setVisitor(response);
  } catch (err) {
    console.error('Error fetching visitor:', err);
    setError('Failed to load visitor details');
  } finally {
    setLoading(false);
  }
};



    fetchVisitor();
  }, [id]);

  if (loading) return <div>Loading visitor details...</div>;
  if (error || !visitor) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link to="/dashboard/admin/visitors" className="flex items-center text-blue-600">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Visitors
        </Link>
<div className="flex space-x-3">
  <Button 
      className="bg-[#004e9a] hover:bg-[#003d7a] text-white border-none"
    onClick={() => window.location.href = `mailto:${visitor.email}`}
  >
    <Mail className="w-4 h-4 mr-2" />
    Email
  </Button>
  
  <Button 
      className="bg-[#f37021] hover:bg-[#d85a0f] text-white border-none"

    onClick={() => window.location.href = `tel:${visitor.phone}`}
  >
    <Phone className="w-4 h-4 mr-2" />
    Call
  </Button>
  
  <Button 
  className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none" 
    onClick={() => window.location.href = `https://wa.me/${visitor.whatsapp}`}
  >
    <MessageSquare className="w-4 h-4 mr-2" />
    WhatsApp
  </Button>

  <Button 
  className="bg-[#faa61a] hover:bg-[#f59300] text-white border-none"
    onClick={() => setShowDocuments(true)}
  >
    <FileText className="w-4 h-4 mr-2" />
    View Documents
  </Button>
</div>



      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            {visitor.profilePicture ? (
              <img
                src={visitor.profilePicture}
                alt={visitor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">{visitor.name}</h1>
                <div className="flex items-center mt-2 space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
  visitor.visitorType === 'Student'
    ? 'bg-[#004e9a]/10 text-[#004e9a]' 
    : 'bg-[#f37021]/10 text-[#f37021]'
}`}>
  {visitor.visitorType}
</span>

                  <span className="text-gray-500">{visitor.gender}</span>
                  <span className="text-gray-500">{visitor.age} years</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Joined</div>
                <div>{new Date(visitor.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{visitor.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{visitor.phone}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                  <span>WhatsApp: {visitor.whatsapp}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{visitor.country}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span>
                    {visitor.address.city}, {visitor.address.state}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Preferred Contact: {visitor.preferredContact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Education Details */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education Details
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Level</label>
              <p className="font-medium">{visitor.education.level}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Institution</label>
              <p className="font-medium">{visitor.education.institution}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Field of Study</label>
              <p className="font-medium">{visitor.education.fieldOfStudy}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Degree Name</label>
              <p className="font-medium">{visitor.education.degreeName}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Course Type</label>
              <p className="font-medium">{visitor.education.courseType}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Mode of Study</label>
              <p className="font-medium">{visitor.education.modeOfStudy}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Scores</label>
              <p className="font-medium">
                GPA: {visitor.education.score.gpa} | 
                Percentage: {visitor.education.score.percentage}%
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Year of Completion</label>
              <p className="font-medium">{visitor.education.yearOfReceiving}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Professional Experience */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Professional Experience
        </h2>
        {visitor.professional.companyName ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Company</label>
                <p className="font-medium">{visitor.professional.companyName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Job Title</label>
                <p className="font-medium">{visitor.professional.jobTitle}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Experience</label>
                <p className="font-medium">{visitor.professional.yearsOfExperience} years</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No professional experience</p>
        )}
      </Card>

      {/* Additional Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Consultation Status</label>
              <p className="font-medium">
                {visitor.isConsultationBooked ? (
                  <span className="text-green-600">Booked</span>
                ) : (
                  <span className="text-yellow-600">Not Booked</span>
                )}
              </p>
            </div>
            {visitor.preferredConsultationDate && (
              <div>
                <label className="text-sm text-gray-500">Preferred Consultation Date</label>
                <p className="font-medium">
                  {new Date(visitor.preferredConsultationDate).toLocaleString()}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm text-gray-500">Referral Source</label>
              <p className="font-medium">{visitor.referralSource}</p>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Notes</label>
            <p className="font-medium">{visitor.notes || 'No notes'}</p>
          </div>
        </div>
      </Card>
      {/* Interested Course */}
{visitor.interestedCourse && (
  <Card className="p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <BookOpen className="w-5 h-5 mr-2" />
      Interested Course
    </h2>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-500">Course Name</label>
          <p className="font-medium">{visitor.interestedCourse.name}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Duration</label>
          <p className="font-medium">{visitor.interestedCourse.duration}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Credits</label>
          <p className="font-medium">{visitor.interestedCourse.credits}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Mode</label>
          <p className="font-medium">{visitor.interestedCourse.mode}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-500">Fee</label>
          <p className="font-medium">${visitor.interestedCourse.fee.toLocaleString()}/yr</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Instructor</label>
          <p className="font-medium">{visitor.interestedCourse.instructor || 'Not specified'}</p>
        </div>
        {visitor.interestedCourse.prerequisites?.length > 0 && (
          <div>
            <label className="text-sm text-gray-500">Prerequisites</label>
            <ul className="list-disc list-inside">
              {visitor.interestedCourse.prerequisites.map((prereq: string, index: number) => (
                <li key={index} className="font-medium">{prereq}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </Card>
)}

      {/* Interested Job */}
{visitor.interestedJob && (
  <Card className="p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <Briefcase className="w-5 h-5 mr-2" />
      Interested Job
    </h2>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-500">Job Title</label>
          <p className="font-medium">{visitor.interestedJob.title}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Company</label>
          <p className="font-medium">{visitor.interestedJob.company}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Location</label>
          <p className="font-medium">{visitor.interestedJob.location}, {visitor.interestedJob.country}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Job Type</label>
          <p className="font-medium">{visitor.interestedJob.jobType}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-500">Salary</label>
          <p className="font-medium">{visitor.interestedJob.salary}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Application Deadline</label>
          <p className="font-medium">
            {new Date(visitor.interestedJob.applicationDeadline).toLocaleDateString()}
          </p>
        </div>
        {visitor.interestedJob.requirements?.length > 0 && (
          <div>
            <label className="text-sm text-gray-500">Requirements</label>
            <ul className="list-disc list-inside">
              {visitor.interestedJob.requirements.map((req: string, index: number) => (
                <li key={index} className="font-medium">{req}</li>
              ))}
            </ul>
          </div>
        )}
        {visitor.interestedJob.tags?.length > 0 && (
          <div>
            <label className="text-sm text-gray-500">Tags</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {visitor.interestedJob.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </Card>
)}


      {/* Documents Modal */}
      {showDocuments && (
        <VisitorDocumentsModal
          documents={visitor.documents}
          onClose={() => setShowDocuments(false)}
        />
      )}
    </div>
  );
};
