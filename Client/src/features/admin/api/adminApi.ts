import axios from '../../../lib/axios';
import type { Application, ApplicationStats } from '../types/application';

export const adminApi = {
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
    const { data: response } = await axios.post('/admin/applications', data);
    return response.application;
  },

  getAllApplications: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    paymentStatus?: string;
    serviceId?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
    sortBy?: string;
  }) => {
    const { data } = await axios.get('/admin/applications', { params });
    return {
      applications: data.applications,
      stats: data.stats,
      total: data.total,
      page: data.page,
      pages: data.pages
    };
  },

  updateApplicationStatus: async (id: string, updates: {
    status?: 'Pending' | 'Approved' | 'Rejected';
    paymentStatus?: 'Pending' | 'Partial' | 'Completed';
    amountPaid?: number;
    adminNotes?: string;
  }) => {
    const { data } = await axios.put(`/admin/applications/${id}`, updates);
    return data.application;
  },

  getVisitors: async () => {
    try {
      const { data } = await axios.get('/visitor');
      return data?.data?.visitors || [];
    } catch (error) {
      console.error('Error fetching visitors:', error);
      return [];
    }
  },

  getServices: async () => {
    try {
      const { data } = await axios.get('/service');
      return data?.data || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }
};