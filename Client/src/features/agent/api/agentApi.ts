import axios from '../../../lib/axios';
import type { 
  Visitor, 
  Application, 
  AgentStats, 
  WithdrawalRequest,
  PaymentMethod,
  PaymentDetails,
  Commission
} from '../types';

export const agentApi = {
  // Visitor Management
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

  // Application Management
  createApplication: async (data: { 
    visitorId: string; 
    services: Array<{ serviceId: string }> 
  }) => {
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

  updateApplication: async (id: string, updateData: Partial<Application>) => {
    const { data } = await axios.put(`/agent/applications/${id}`, updateData);
    return data.application;
  },

  // OTRA (One-Time Recovery Amount) Management
  createOtraRequest: async (data: {
    applicationId: string;
    amount: number;
    reason: string;
  }) => {
    const { data: response } = await axios.post('/agent/otra-requests', data);
    return response.otraRequest;
  },

  // Payment Method Management
  updatePaymentMethod: async (data: {
    type: PaymentMethod;
    details: PaymentDetails;
  }) => {
    const { data: response } = await axios.put('/agent/payment-method', data);
    return response.paymentMethod;
  },

  getPaymentMethod: async () => {
    const { data } = await axios.get('/agent/payment-method');
    return data.paymentMethod;
  },

  // Stats and Analytics
  getStats: async () => {
    const { data } = await axios.get('/agent/stats');
    return data.stats;
  },

  // Withdrawal Management
  requestWithdrawal: async (amount: number) => {
    const { data } = await axios.post('/agent/withdraw', { amount });
    return data.withdrawalRequest;
  },

  getWithdrawalRequests: async (page = 1, limit = 10) => {
    const { data } = await axios.get(`/agent/withdrawals?page=${page}&limit=${limit}`);
    return data.withdrawalRequests;
  },

  // Commission Management
  getCommissionHistory: async (page = 1, limit = 10) => {
    const { data } = await axios.get(`/agent/commissions?page=${page}&limit=${limit}`);
    return data.commissions;
  }
};