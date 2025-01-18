// src/pages/admin/AdminPaymentHistory.tsx
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { PaymentHistoryTable } from '../../features/admin/components/payments/PaymentHistoryTable';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { paymentService } from '../../services/payment.service';


import type { Payment } from '../../types/payment';

export const AdminPaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await paymentService.getPaymentHistory();
        setPayments(data);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payment history');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(payment => 
    payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.razorpayPaymentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment History</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <PaymentHistoryTable payments={filteredPayments} />
    </div>
  );
};
