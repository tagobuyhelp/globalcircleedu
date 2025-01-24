import axios from '../../../lib/axios';
import type { Service } from '../types/service';

export const serviceApi = {
  getAll: async () => {
    const { data } = await axios.get('/service');
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/service/${id}`);
    return data.data;
  },

  create: async (serviceData: Omit<Service, '_id'>) => {
    const { data } = await axios.post('/service/create', serviceData);
    return data.data;
  },

  update: async (id: string, serviceData: Partial<Service>) => {
    const { data } = await axios.put(`/service/${id}`, serviceData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`/service/${id}`);
    return data;
  }
};