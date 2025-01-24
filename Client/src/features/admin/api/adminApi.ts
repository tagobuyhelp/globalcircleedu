import axios from '../../../lib/axios';
import type { Application, ApplicationStats } from '../types/application';

export const adminApi = {
  // Add getVisitors method
  getVisitors: async () => {
    try {
      const { data } = await axios.get('/visitor');
      return data.data.visitors || [];
    } catch (error) {
      console.error('Error fetching visitors:', error);
      return [];
    }
  },

  // Add getServices method
  getServices: async () => {
    try {
      const { data } = await axios.get('/service');
      return data.data || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  createApplication: async (data: {
    visitorId: string;
    agentId?: string;
    services: Array<{
      serviceId: string;
      status?: string;
      paymentStatus?: string;
      amountPaid?: number;
    }>;
    adminNotes?: string;
  }) => {
    const { data: response } = await axios.post('/applications', data);
    return response.application;
  },

  getAllApplications: async (params?: {
    page?: number;
    limit?: number;
    status?: string[];
    paymentStatus?: string[];
    startDate?: string;
    endDate?: string;
    search?: string;
  }) => {
    const { data } = await axios.get('/applications', { params });
    return {
      applications: data.data,
      total: data.total,
      page: data.page,
      pages: data.pages
    };
  },

  updateApplication: async (id: string, updates: {
    services?: Array<{
      serviceId: string;
      status?: string;
      paymentStatus?: string;
      amountPaid?: number;
    }>;
    adminNotes?: string;
  }) => {
    const { data } = await axios.put(`/applications/${id}`, updates);
    return data.data;
  }
};