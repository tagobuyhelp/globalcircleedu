import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { VisitorActions } from './VisitorActions';
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { parseJsonField } from '../../../utils/parseJson';
import type { Visitor } from '../types/visitor';

interface VisitorCardProps {
  visitor: Visitor;
  onDelete: (id: string) => void;
  onViewDocuments: () => void;
}

export const VisitorCard: React.FC<VisitorCardProps> = ({
  visitor,
  onDelete,
  onViewDocuments,
}) => {
  // Parse stringified JSON fields
  const address = parseJsonField(visitor.address);
  const education = parseJsonField(visitor.education);
  const professional = parseJsonField(visitor.professional);

  return (
    <Card className="p-6">
      <div className="flex items-start space-x-6">
        {visitor.profilePicture && (
          <img
            src={visitor.profilePicture}
            alt={visitor.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <Link 
                to={`/dashboard/admin/visitors/${visitor._id}`}
                className="text-xl font-semibold hover:text-blue-600"
              >
                {visitor.name}
              </Link>
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                visitor.visitorType === 'Student'
                  ? 'bg-[#004e9a]/10 text-[#004e9a]'
                  : 'bg-[#f37021]/10 text-[#f37021]'
              }`}>
                {visitor.visitorType}
              </span>
            </div>
            <VisitorActions
              visitorId={visitor._id}
              onViewDocuments={onViewDocuments}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>{visitor.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{visitor.phone}</span>
              </div>
              {address && (
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{address.city}, {address.state}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {education && (
                <div className="flex items-center text-sm">
                  <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{education.level} in {education.fieldOfStudy}</span>
                </div>
              )}
              {professional && professional.jobTitle && (
                <div className="flex items-center text-sm">
                  <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{professional.jobTitle}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};