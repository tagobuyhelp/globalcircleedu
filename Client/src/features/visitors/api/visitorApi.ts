import axios from 'axios';
import { API_URL } from '../../../config/api';
import type { CreateVisitorInput, UpdateVisitorInput, VisitorsResponse } from '../types/api';

export const visitorApi = {
  getAll: async (page = 1, limit = 10) => {
    const { data } = await axios.get<{ data: VisitorsResponse }>(
      `${API_URL}/visitor?page=${page}&limit=${limit}`
    );
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`${API_URL}/visitor/${id}`);
    return data.data;
  },

  create: async (visitorData: CreateVisitorInput) => {
    const { data } = await axios.post(`${API_URL}/visitor`, visitorData);
    return data.data;
  },

  update: async (id: string, visitorData: UpdateVisitorInput) => {
    const { data } = await axios.put(`${API_URL}/visitor/${id}`, visitorData);
    return data.data;
  },

  delete: async (id: string) => {
    await axios.delete(`${API_URL}/visitor/${id}`);
  },
};