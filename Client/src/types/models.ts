// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'agent';
  createdAt: string;
  updatedAt: string;
}

export interface Visitor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: 'Study Abroad' | 'Job Placement' | 'Other' | 'All';
  fees: Fee[];
  commissionRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Fee {
  id: string;
  name: string;
  amount: number;
  description: string;
  isOptional: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  user: User;
  commission: number;
  availableBalance: number;
  paymentMethod: 'bank' | 'paypal' | 'other';
  paymentDetails: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}