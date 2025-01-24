import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { PaymentHistoryTable } from '../../features/admin/components/payments/PaymentHistoryTable';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { paymentService } from '../../services/payment.service';
import { Pagination } from '../../components/ui/Pagination';
import type { Payment } from '../../types/payment';

export const AdminPaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<keyof Payment>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchPayments();
  }, [currentPage, sortField, sortDirection]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentService.getPaymentHistory();
      
      if (data && Array.isArray(data.data)) {
        setPayments(data.data);
        setTotalPages(data.pagination.totalPages);
        setError(null);
      } else {
        setPayments([]);
        setError('No payment data available');
      }
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to load payment history');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: keyof Payment) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredPayments = payments.filter(payment => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (typeof payment.service === 'string' && payment.service.toLowerCase().includes(searchLower)) ||
      payment.transactionId?.toLowerCase().includes(searchLower) ||
      payment.razorpayPaymentId?.toLowerCase().includes(searchLower) ||
      payment.paymentMethod.toLowerCase().includes(searchLower) ||
      payment.offlineDetails?.referenceNumber?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <LoadingSpinner />;

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

      {error ? (
        <Card className="p-6 text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </Card>
      ) : (
        <>
          <PaymentHistoryTable 
            payments={filteredPayments}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};