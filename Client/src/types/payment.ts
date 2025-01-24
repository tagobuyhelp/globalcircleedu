export interface Payment {
  _id: string;
  user: string;
  amount: number;
  currency: string;
  paymentMethod: 'stripe' | 'razorpay' | 'offline';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  service: string;
  offlineDetails?: {
    paymentMode: string;
    referenceNumber: string;
    notes: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaymentHistory {
  success: boolean;
  data: Payment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}