export type PaymentMethod = 'bank' | 'paypal' | 'other';

export interface PaymentDetails {
  bankName?: string;
  accountNumber?: string;
  accountHolderName?: string;
  paypalEmail?: string;
  otherDetails?: Record<string, string>;
}

export interface Visitor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdBy: string;
  createdAt: string;
}

export interface Application {
  _id: string;
  visitorId: {
    _id: string;
    name: string;
    email: string;
  };
  services: Array<{
    serviceId: {
      _id: string;
      name: string;
    };
    status: 'Pending' | 'Approved' | 'Rejected';
    paymentStatus: 'Pending' | 'Completed';
    amountPaid: number;
    commissionAmount: number;
  }>;
  createdAt: string;
}

export interface AgentStats {
  visitorCount: number;
  applicationCount: number;
  totalApplications: number;
  approvedApplications: number;
  pendingApplications: number;
  rejectedApplications: number;
  totalCommission: number;
  totalBalance: number;
  availableBalance: number;
  commissionEarned: number;
}

export interface WithdrawalRequest {
  _id: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  bankDetails: Record<string, string>;
  createdAt: string;
}

export interface Commission {
  _id: string;
  applicationId: string;
  amount: number;
  status: 'Pending' | 'Paid';
  createdAt: string;
}

export interface OtraRequest {
  _id: string;
  applicationId: string;
  amount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}