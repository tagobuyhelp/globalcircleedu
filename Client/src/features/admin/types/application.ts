// src/features/admin/types/application.ts
export interface ApplicationService {
  serviceId: {
    _id: string;
    name: string;
    fees: Array<{
      name: string;
      amount: number;
      isOptional: boolean;
    }>;
  };
  status: 'Pending' | 'Approved' | 'Rejected';
  paymentStatus: 'Pending' | 'Partial' | 'Completed';
  amountPaid: number;
  commissionAmount: number;
}

export interface Application {
  _id: string;
  agentId?: {
    _id: string;
    name: string;
    email: string;
  };
  visitorId: {
    _id: string;
    name: string;
    email: string;
  };
  services: ApplicationService[];
  adminNotes?: string;
  totalServiceFeesDue: number;
  totalAmountPaid: number;
  totalCommissionAmount: number;
  amountDue: number;
  createdAt: string;
}

export interface ApplicationStats {
  serviceStats: {
    totalApplications: number;
    totalAmountPaid: number;
    totalCommission: number;
    pendingServices: number;
    approvedApplications: number;
    rejectedApplications: number;
  };
  additionalStats: {
    totalServiceFeesDue: number;
    totalAmountPaid: number;
    totalCommissionAmount: number;
    totalAmountDue: number;
  };
}
