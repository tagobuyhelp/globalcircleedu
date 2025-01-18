// src/features/admin/types/index.ts
export interface Application {
  _id: string;
  agentId: {
    _id: string;
    name: string;
    email: string;
  };
  visitorId: {
    _id: string;
    name: string;
    email: string;
  };
  serviceId: {
    _id: string;
    name: string;
  };
  status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
  paymentStatus: 'Pending' | 'Partial' | 'Completed';
  amountPaid: number;
  commissionAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalAmountPaid: number;
  totalCommission: number;
}

export interface WithdrawalRequest {
  _id: string;
  agent: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentMethod: string;
  paymentDetails: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
