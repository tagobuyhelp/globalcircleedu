export interface Service {
  _id: string;
  name: string;
  description?: string;
  type: 'Study Abroad' | 'Job Placement' | 'Other' | 'All';
  fees: Fee[];
  commissionRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Fee {
  _id: string;
  name: string;
  amount: number;
  description?: string;
  isOptional: boolean;
  isActive: boolean;
}