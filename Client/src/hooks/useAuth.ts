import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      // Only redirect to login if on a protected route
      if (window.location.pathname.startsWith('/dashboard')) {
        navigate('/login');
      }
    }
  }, [logout, navigate]);

  return { logout };
}