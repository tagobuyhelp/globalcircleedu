import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/auth/authApi';
import { useAuthStore } from '../store/authStore';
import type { AuthError } from '../types/auth';

export function useRegister() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.register(data);
      
      // After successful registration, log the user in
      const { user, token } = await authApi.login({
        email: data.email,
        password: data.password,
      });

      setAuth(user, token);

      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'agent':
          navigate('/dashboard/agent');
          break;
        default:
          navigate('/dashboard/user');
      }
    } catch (err: any) {
      setError({
        message: err.response?.data?.message || 'Failed to register',
        errors: err.response?.data?.errors,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
}