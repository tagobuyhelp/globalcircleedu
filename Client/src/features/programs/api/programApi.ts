import axios from '../../../lib/axios';
import type { Program } from '../types/program';

export const programApi = {
  getAll: async () => {
    const { data } = await axios.get('/program/programs');
    return data.programs;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/program/programs/${id}`);
    return data.program;
  },

  create: async (programData: Omit<Program, '_id'>) => {
    const { data } = await axios.post('/program/create', programData);
    return data.program;
  },

  update: async (id: string, programData: Partial<Program>) => {
    const { data } = await axios.put(`/program/programs/${id}`, programData);
    return data.program;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`/program/programs/${id}`);
    return data;
  }
};