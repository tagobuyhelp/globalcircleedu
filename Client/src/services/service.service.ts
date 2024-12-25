import api from '../lib/api';
import type { Service } from '../types/models';
import type { PaginatedResponse } from '../types/api';

export const serviceService = {
  create: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<Service>('/service/create', data),
    
  getAll: (page = 1) =>
    api.get<PaginatedResponse<Service>>(`/service?page=${page}`),
    
  getById: (id: string) =>
    api.get<Service>(`/service/${id}`),
    
  update: (id: string, data: Partial<Service>) =>
    api.put<Service>(`/service/${id}`, data),
    
  delete: (id: string) =>
    api.delete(`/service/${id}`),
};

export default serviceService;