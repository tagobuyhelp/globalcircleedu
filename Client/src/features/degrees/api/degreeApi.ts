import axios from '../../../lib/axios';
import type { Degree } from '../types/degree';

export const degreeApi = {
  getAll: async () => {
    const { data } = await axios.get('/degree/degrees');
    return data.degrees;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/degree/degrees/${id}`);
    return data.degree;
  },

  create: async (degreeData: Omit<Degree, '_id'>) => {
    const { data } = await axios.post('/degree/create', degreeData);
    return data.degree;
  },

  update: async (id: string, degreeData: Partial<Degree>) => {
    const { data } = await axios.put(`/degree/degrees/${id}`, degreeData);
    return data.degree;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`/degree/degrees/${id}`);
    return data;
  }
};


export const getDegreeOptions = async () => {
  try {
    const { data } = await axios.get('/degree/degrees');
    // Add null check and default to empty array
    const degrees = data?.degrees || [];
    return degrees.map((degree: any) => ({
      value: degree._id,
      label: degree.name
    }));
  } catch (error) {
    console.error('Error fetching degrees:', error);
    return []; // Return empty array on error
  }
};