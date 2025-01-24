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
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
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
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  totalAmountPaid: number;
  totalCommissionAmount: number;
  adminNotes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFilters {
  status?: string[];
  paymentStatus?: string[];
  serviceId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface ApplicationStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  completedApplications: number;
  totalAmountPaid: number;
  totalCommissionAmount: number;
}