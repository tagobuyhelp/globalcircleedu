import React, { useRef, useState } from 'react';
import { Upload, Eye, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  preview?: string;
  onFileSelect: (file: File) => void;
  icon?: React.ElementType;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  error,
  preview,
  onFileSelect,
  className,
  icon: Icon = Upload,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const isPDF = preview?.toLowerCase().endsWith('.pdf');
  const hasFile = selectedFile || preview;

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          {...props}
        />
        
        <div 
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "cursor-pointer border-2 border-dashed rounded-lg p-6 transition-all",
            "flex flex-col items-center justify-center min-h-[150px]",
            isDragging 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
              : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400",
            hasFile ? "bg-gray-50 dark:bg-gray-800" : ""
          )}
        >
          {hasFile ? (
            <div className="flex flex-col items-center">
              {isPDF ? (
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="w-12 h-12 text-blue-600" />
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Eye className="w-4 h-4" />
                    <a 
                      href={preview} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {selectedFile ? selectedFile.name : 'View Document'}
                    </a>
                  </div>
                </div>
              ) : (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-32 object-contain rounded"
                />
              )}
              <p className="mt-2 text-sm text-gray-500">Click to change file</p>
            </div>
          ) : (
            <>
              <Icon className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-sm text-gray-500 text-center">
                Click to upload or drag and drop
                <br />
                <span className="text-xs">
                  {props.accept?.split(',').join(', ')}
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};