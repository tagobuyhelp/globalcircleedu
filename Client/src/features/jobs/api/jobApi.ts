// src/features/jobs/api/jobApi.ts
import axios from '../../../lib/axios';
import type { Job } from '../types/job';

export const jobApi = {
  getAll: async () => {
    const { data } = await axios.get('/job/jobs');
    return data.jobs;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/job/jobs/${id}`);
    return data.job;
  },

  create: async (jobData: Omit<Job, '_id'>) => {
    const { data } = await axios.post('/job/create', jobData);
    return data.job;
  },

  update: async (id: string, jobData: Partial<Job>) => {
    const { data } = await axios.put(`/job/jobs/${id}`, jobData);
    return data.job;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`/job/jobs/${id}`);
    return data;
  }
};
