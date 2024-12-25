import api from '../lib/api';
import type { Agent } from '../types/models';

export const agentService = {
  getApplications: (page = 1) =>
    api.get(`/agent/applications?page=${page}`),
    
  createApplication: (data: any) =>
    api.post('/agent/applications', data),
    
  getApplicationById: (id: string) =>
    api.get(`/agent/applications/${id}`),
    
  updateApplication: (id: string, data: any) =>
    api.put(`/agent/applications/${id}`, data),
    
  getStats: () =>
    api.get('/agent/stats'),
    
  requestWithdrawal: (amount: number) =>
    api.post('/agent/withdraw', { amount }),
    
  getWithdrawals: () =>
    api.get('/agent/withdrawals'),
    
  updatePaymentMethod: (data: Pick<Agent, 'paymentMethod' | 'paymentDetails'>) =>
    api.put('/agent/payment-method', data),
};

export default agentService;