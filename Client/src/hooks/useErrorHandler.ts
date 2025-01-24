import { useState, useCallback } from 'react';
import { ApiError } from '../types/error';
import { handleApiError, handleAuthError, isAuthError } from '../utils/errorHandlers';
import { useAuthStore } from '../store/authStore';

export function useErrorHandler() {
  const [error, setError] = useState<ApiError | null>(null);
  const logout = useAuthStore((state) => state.logout);

  const handleError = useCallback((err: any) => {
    const processedError = isAuthError(err) ? handleAuthError(err) : handleApiError(err);
    
    // Handle authentication errors
    if (processedError.statusCode === 401) {
      logout();
    }

    setError(processedError);
    return processedError;
  }, [logout]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
}