export type PaymentMethod = 'bank_transfer' | 'paypal' | 'stripe';

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
  totalApplications: number;
  approvedApplications: number;
  totalCommission: number;
  totalEarned: number;
  availableBalance: number;
}

export interface WithdrawalRequest {
  _id: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Declined';
  paymentMethod: PaymentMethod;
  paymentDetails: Record<string, string>;
  createdAt: string;
}

export interface PaymentDetails {
  bankName?: string;
  accountNumber?: string;
  accountHolderName?: string;
  paypalEmail?: string;
  stripeAccountId?: string;
}