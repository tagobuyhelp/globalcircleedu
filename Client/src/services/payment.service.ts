import axios from '../lib/axios';
import type { Payment } from '../types/payment';

export const paymentService = {
  createPayment: async (data: {
    amount: number;
    currency: string;
    paymentMethod: 'stripe' | 'razorpay' | 'offline';
    serviceId: string;
    offlineDetails?: {
      paymentMode: string;
      referenceNumber: string;
      notes: string;
    };
  }) => {
    const { data: response } = await axios.post('/payment/create', data);
    return response.data;
  },

  verifyRazorpayPayment: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const { data: response } = await axios.post('/payment/verify-razorpay', data);
    return response.data;
  },

  getPaymentHistory: async (params?: {
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const { data: response } = await axios.get('/payment/history', { params });
    return response;
  }
};