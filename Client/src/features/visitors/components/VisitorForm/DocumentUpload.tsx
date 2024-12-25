import React from 'react';
import { FileUpload } from '../../../../components/ui/FileUpload';
import type { Documents } from '../../types/visitor';

interface DocumentUploadProps {
  documents: Partial<Documents>;
  onFileSelect: (fieldName: keyof Documents, file: File) => void;
  errors?: Record<string, string>;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documents,
  onFileSelect,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Required Documents</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          name="identityDocument"
          label="Identity Document"
          accept=".pdf,.jpg,.jpeg,.png"
          preview={documents.identityDocument?.fileURL}
          error={errors?.identityDocument}
          onFileSelect={(file) => onFileSelect('identityDocument', file)}
        />

        <FileUpload
          name="transcript"
          label="Academic Transcript"
          accept=".pdf"
          preview={documents.transcript?.fileURL}
          error={errors?.transcript}
          onFileSelect={(file) => onFileSelect('transcript', file)}
        />

        <FileUpload
          name="workExperience"
          label="Work Experience Certificate"
          accept=".pdf"
          preview={documents.workExperience?.fileURL}
          error={errors?.workExperience}
          onFileSelect={(file) => onFileSelect('workExperience', file)}
        />

        <FileUpload
          name="languageTests"
          label="Language Test Results"
          accept=".pdf"
          preview={documents.languageTests?.fileURL}
          error={errors?.languageTests}
          onFileSelect={(file) => onFileSelect('languageTests', file)}
        />
      </div>
    </div>
  );
};