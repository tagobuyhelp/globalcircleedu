import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: async (data: { email: string; password: string; name: string }) =>
    api.post('/register', data),
  login: async (data: { email: string; password: string }) =>
    api.post('/login', data),
  forgotPassword: async (email: string) =>
    api.post('/forgotpassword', { email }),
  resetPassword: async (token: string, password: string) =>
    api.put('/resetpassword', { token, password }),
};

export const visitors = {
  create: async (data: any) => api.post('/visitors', data),
  getAll: async (page = 1) => api.get(`/visitors?page=${page}`),
  getStats: async () => api.get('/visitors/stats'),
  getById: async (id: string) => api.get(`/visitors/${id}`),
  update: async (id: string, data: any) => api.put(`/visitors/${id}`, data),
  delete: async (id: string) => api.delete(`/visitors/${id}`),
};

export const applications = {
  create: async (data: any) => api.post('/applications', data),
  getAll: async (page = 1) => api.get(`/applications?page=${page}`),
  getById: async (id: string) => api.get(`/applications/${id}`),
  update: async (id: string, data: any) => api.put(`/applications/${id}`, data),
  getStats: async () => api.get('/stats'),
};

export const programs = {
  create: async (data: any) => api.post('/programs/create', data),
  getAll: async (page = 1) => api.get(`/programs?page=${page}`),
  getById: async (id: string) => api.get(`/programs/${id}`),
  update: async (id: string, data: any) => api.put(`/programs/${id}`, data),
  delete: async (id: string) => api.delete(`/programs/${id}`),
};

export default api;