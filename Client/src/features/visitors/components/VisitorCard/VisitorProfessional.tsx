import React from 'react';
import type { Professional } from '../../types/visitor';

interface VisitorProfessionalProps {
  professional: Professional;
}

export const VisitorProfessional: React.FC<VisitorProfessionalProps> = ({ professional }) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Professional Experience</h4>
      <div className="space-y-2 text-sm">
        {professional.companyName ? (
          <>
            <p><span className="font-medium">Company:</span> {professional.companyName}</p>
            <p><span className="font-medium">Position:</span> {professional.jobTitle}</p>
            <p><span className="font-medium">Experience:</span> {professional.yearsOfExperience} years</p>
          </>
        ) : (
          <p className="text-gray-500">No work experience</p>
        )}
      </div>
    </div>
  );
};