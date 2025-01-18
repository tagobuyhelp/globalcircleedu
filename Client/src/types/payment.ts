// src/types/payment.ts
export interface Payment {
  _id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'stripe' | 'razorpay';
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  service: string;
  createdAt: string;
  updatedAt: string;
}
