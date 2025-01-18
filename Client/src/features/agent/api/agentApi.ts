import axios from '../../../lib/axios';
import type { Application, AgentStats, WithdrawalRequest, PaymentMethod, Visitor } from '../types';

export const agentApi = {
  // Visitors
  createVisitor: async (visitorData: Omit<Visitor, '_id' | 'createdBy' | 'createdAt'>) => {
    const { data } = await axios.post('/agent/visitors', visitorData);
    return data.visitor;
  },

  getVisitors: async (page = 1, limit = 10) => {
    const { data } = await axios.get(`/agent/visitors?page=${page}&limit=${limit}`);
    return data;
  },

  updateVisitor: async (visitorId: string, updateData: Partial<Visitor>) => {
    const { data } = await axios.put(`/agent/visitors/${visitorId}`, updateData);
    return data.visitor;
  },

  // Applications
  createApplication: async (data: { visitorId: string; services: Array<{ serviceId: string }> }) => {
    const { data: response } = await axios.post('/agent/applications', data);
    return response.application;
  },

  getApplications: async (page = 1, limit = 10) => {
    const { data } = await axios.get(`/agent/applications?page=${page}&limit=${limit}`);
    return data;
  },

  getApplicationDetails: async (id: string) => {
    const { data } = await axios.get(`/agent/applications/${id}`);
    return data.application;
  },

  updateApplication: async (id: string, status: string) => {
    const { data } = await axios.put(`/agent/applications/${id}`, { status });
    return data.application;
  },

  // Stats and Withdrawals
  getStats: async () => {
    const { data } = await axios.get('/agent/stats');
    return data.stats;
  },

  requestWithdrawal: async (amount: number) => {
    const { data } = await axios.post('/agent/withdraw', { amount });
    return data.withdrawalRequest;
  },

  getWithdrawalRequests: async () => {
    const { data } = await axios.get('/agent/withdrawals');
    return data.withdrawalRequests;
  },

  updatePaymentMethod: async (updates: {
    paymentMethod: PaymentMethod;
    paymentDetails: Record<string, string>;
  }) => {
    const { data } = await axios.put('/agent/payment-method', updates);
    return data.agent;
  }
};