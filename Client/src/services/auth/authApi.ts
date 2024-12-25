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
    const { data } = await axios.post('/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      role: userData.role === 'agent' ? 'agent' : 'user'
    });
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message);
  },

  getAllUsers: async () => {
    const { data } = await axios.get('/users');
    return data.data.map((user: any) => ({
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      createdAt: user.createdAt
    }));
  },

  logout: async () => {
    localStorage.removeItem('token');
  }
};