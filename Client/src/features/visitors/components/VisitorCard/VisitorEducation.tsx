import React from 'react';
import type { Education } from '../../types/visitor';

interface VisitorEducationProps {
  education: Education;
}

export const VisitorEducation: React.FC<VisitorEducationProps> = ({ education }) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Education</h4>
      <div className="space-y-2 text-sm">
        <p><span className="font-medium">Institution:</span> {education.institution}</p>
        <p><span className="font-medium">Degree:</span> {education.degreeName}</p>
        <p><span className="font-medium">GPA:</span> {education.score.gpa}</p>
        <p><span className="font-medium">Year:</span> {education.yearOfReceiving}</p>
      </div>
    </div>
  );
};