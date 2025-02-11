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
  // Parse stringified JSON fields safely
  const address = parseJsonField(visitor.address) ?? {};
  const education = parseJsonField(visitor.education) ?? {};
  const professional = parseJsonField(visitor.professional) ?? {};

  return (
    <Card className="p-6">
      <div className="flex items-start space-x-6">
        {visitor.profilePicture ? (
          <img
            src={visitor.profilePicture}
            alt={visitor.name ?? "Visitor"}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <Link 
                to={`/dashboard/admin/visitors/${visitor._id}`}
                className="text-xl font-semibold hover:text-blue-600"
              >
                {visitor.name ?? "Unknown"}
              </Link>
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                visitor.visitorType === 'Student'
                  ? 'bg-[#004e9a]/10 text-[#004e9a]'
                  : 'bg-[#f37021]/10 text-[#f37021]'
              }`}>
                {visitor.visitorType ?? "Not specified"}
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
                <span>{visitor.email ?? "No email available"}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{visitor.phone ?? "No phone available"}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span>
                  {address.city ?? "Unknown city"}, {address.state ?? "Unknown state"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                <span>
                  {education.level ?? "No education data"} in {education.fieldOfStudy ?? "Unknown field"}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                <span>{professional.jobTitle ?? "No work experience"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
