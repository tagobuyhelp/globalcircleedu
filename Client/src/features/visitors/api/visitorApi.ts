import axios from '../../../lib/axios';
import type { Visitor } from '../types/visitor';

export const visitorApi = {
  getAll: async (page = 1, limit = 10) => {
    const { data } = await axios.get(`/visitor?page=${page}&limit=${limit}`);
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/visitor/${id}`);
    return data.data;
  },

  create: async (formData: FormData) => {
    const { data } = await axios.post('/visitor/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  update: async (id: string, formData: FormData) => {
  try {
    const response = await axios.put(`/visitor/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { data } = response;
    console.log('Visitor updated successfully:', data.message);
    return data.data;
  } catch (error: any) {
    console.error('Error updating visitor:', error.response?.data || error.message);
    throw error.response?.data || new Error('Something went wrong');
  }
},


  delete: async (id: string) => {
    const { data } = await axios.delete(`/visitor/${id}`);
    return data;
  },

  getStats: async () => {
    const { data } = await axios.get('/visitor/stats');
    return data.data;
  }
};