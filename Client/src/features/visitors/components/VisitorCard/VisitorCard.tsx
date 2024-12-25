import React from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import type { Visitor } from '../../types/visitor';
import { VisitorDocuments } from './VisitorDocuments';
import { VisitorEducation } from './VisitorEducation';
import { VisitorProfessional } from './VisitorProfessional';

interface VisitorCardProps {
  visitor: Visitor;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const VisitorCard: React.FC<VisitorCardProps> = ({
  visitor,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start p-6">
        <img
          src={visitor.profilePicture}
          alt={visitor.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="ml-6 flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold">{visitor.name}</h3>
              <span className="inline-block px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {visitor.visitorType}
              </span>
            </div>
            <div className="space-x-2">
              {onEdit && (
                <Button variant="secondary" onClick={() => onEdit(visitor.id)}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => onDelete(visitor.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2" />
                <span>{visitor.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2" />
                <span>{visitor.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{visitor.address.city}, {visitor.address.state}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <GraduationCap className="w-4 h-4 mr-2" />
                <span>{visitor.education.level} in {visitor.education.fieldOfStudy}</span>
              </div>
              <div className="flex items-center text-sm">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{visitor.professional.jobTitle || 'No work experience'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t px-6 py-4">
        <div className="grid grid-cols-3 gap-6">
          <VisitorEducation education={visitor.education} />
          <VisitorProfessional professional={visitor.professional} />
          <VisitorDocuments documents={visitor.documents} />
        </div>
      </div>
    </Card>
  );
};