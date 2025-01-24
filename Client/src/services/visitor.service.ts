import api from '../lib/api';
import type { Visitor } from '../types/models';
import type { PaginatedResponse } from '../types/api';

export const visitorService = {
  create: (data: Omit<Visitor, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<Visitor>('/visitors', data),
    
  getAll: (page = 1) =>
    api.get<PaginatedResponse<Visitor>>(`/visitors?page=${page}`),
    
  getStats: () =>
    api.get('/visitors/stats'),
    
  getById: (id: string) =>
    api.get<Visitor>(`/visitors/${id}`),
    
  update: (id: string, data: Partial<Visitor>) =>
    api.put<Visitor>(`/visitors/${id}`, data),
    
  delete: (id: string) =>
    api.delete(`/visitors/${id}`),
    
  bulkCreate: (visitors: Array<Omit<Visitor, 'id' | 'createdAt' | 'updatedAt'>>) =>
    api.post<Visitor[]>('/visitors/bulk', { visitors }),
};

export default visitorService;