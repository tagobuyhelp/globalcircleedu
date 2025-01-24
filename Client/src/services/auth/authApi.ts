import axios from '../../lib/axios';
import type { LoginRequest, AuthUser } from '../../types/auth';

export const authApi = {
  login: async (credentials: LoginRequest) => {
    const { data } = await axios.post('/auth/login', credentials);
    if (data.success) {
      const { token, userProfile } = data.data;
      localStorage.setItem('token', token);
      
      const user: AuthUser = {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        role: userProfile.role,
        phone: userProfile.phone
      };
      
      return { user, token };
    }
    throw new Error(data.message);
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
  }) => {
    const { data } = await axios.post('/auth/register', userData);
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message);
  },

  getAllUsers: async () => {
    const { data } = await axios.get('/users');
    return data.data;
  },

  getUserById: async (id: string) => {
    const { data } = await axios.get(`/users/${id}`);
    return data.data;
  },

  updateUser: async (id: string, userData: Partial<{
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
  }>) => {
    const { data } = await axios.put(`/users/${id}`, userData);
    return data.data;
  },

  deleteUser: async (id: string) => {
    const { data } = await axios.delete(`/users/${id}`);
    return data.data;
  },

  logout: async () => {
    localStorage.removeItem('token');
  }
};