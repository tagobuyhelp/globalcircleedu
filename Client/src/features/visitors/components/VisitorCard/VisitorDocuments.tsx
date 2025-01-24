import React from 'react';
import { FileText } from 'lucide-react';
import type { Documents } from '../../types/visitor';

interface VisitorDocumentsProps {
  documents: Documents;
}

export const VisitorDocuments: React.FC<VisitorDocumentsProps> = ({ documents }) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Documents</h4>
      <div className="space-y-2">
        {Object.entries(documents).map(([key, doc]) => (
          doc.fileURL && (
            <a
              key={key}
              href={doc.fileURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              <span>{doc.name}</span>
            </a>
          )
        ))}
      </div>
    </div>
  );
};