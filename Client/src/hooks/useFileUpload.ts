import { useState } from 'react';
import { uploadApi } from '../features/visitors/api/uploadApi';

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, type: string) => {
    try {
      setIsUploading(true);
      setError(null);
      const result = await uploadApi.uploadFile(file, type);
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload file');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultipleFiles = async (files: Record<string, File>, visitorId: string) => {
    try {
      setIsUploading(true);
      setError(null);
      const result = await uploadApi.uploadVisitorDocuments(visitorId, files);
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload files');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    error,
  };
}