import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/auth/authApi';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest, AuthError } from '../types/auth';

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const { user, token } = await authApi.login(credentials);
      setAuth(user, token);

      // Redirect based on user role
      const role = user.role === 'administrator' ? 'admin' : user.role;
      navigate(`/dashboard/${role}`);
    } catch (err: any) {
      setError({
        message: err.response?.data?.message || 'Failed to login',
        errors: err.response?.data?.errors,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
}