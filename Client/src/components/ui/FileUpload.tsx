import React from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  preview?: string;
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  error,
  preview,
  onFileSelect,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      <div className="relative">
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          {...props}
        />
        
        <div 
          onClick={() => document.querySelector<HTMLInputElement>(`input[name="${props.name}"]`)?.click()}
          className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-colors"
        >
          {preview ? (
            <img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-lg"
            />
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                Click to upload or drag and drop
              </span>
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