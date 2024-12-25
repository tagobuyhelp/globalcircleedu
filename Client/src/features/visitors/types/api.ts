import { Visitor } from './visitor';

export interface VisitorsResponse {
  visitors: Visitor[];
  currentPage: number;
  totalPages: number;
  totalVisitors: number;
}

export interface CreateVisitorInput extends Omit<Visitor, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateVisitorInput extends Partial<CreateVisitorInput> {}