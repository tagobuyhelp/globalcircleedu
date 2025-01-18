import axios from '../lib/axios';

export const paymentService = {
  createPayment: async (data: {
    amount: number;
    currency: string;
    paymentMethod: 'stripe' | 'razorpay';
    serviceId: string;
    paymentMethodId?: string;
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

  getPaymentHistory: async () => {
    const { data: response } = await axios.get('/payment/history');
    return response.data;
  }
};