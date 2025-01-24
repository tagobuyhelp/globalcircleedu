import axios from '../../../lib/axios';
import type { University } from '../types/university';
import type { ApiResponse } from '../types/response';

export const universityApi = {
  getAll: async (page = 1, limit = 10) => {
    const { data } = await axios.get(`/universities?page=${page}&limit=${limit}`);
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/universities/${id}`);
    return data.data;
  },

  create: async (formData: FormData) => {
    const { data } = await axios.post('/universities', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  update: async (id: string, formData: FormData) => {
    const { data } = await axios.put(`/universities/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`/universities/${id}`);
    return data.data;
  },

  getRelated: async (country: string, excludeId: string) => {
    const { data } = await axios.get(`/universities?country=${country}&exclude=${excludeId}`);
    return data.data.universities;
  }
};

export const getUniversityOptions = async () => {
  try {
    const { data } = await axios.get('/universities');
    // Add null check and default to empty array
    const universities = data?.data?.universities || [];
    return universities.map((uni: any) => ({
      value: uni._id,
      label: uni.name
    }));
  } catch (error) {
    console.error('Error fetching universities:', error);
    return []; // Return empty array on error
  }
};