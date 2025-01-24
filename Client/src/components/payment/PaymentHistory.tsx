import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { paymentService } from '../../services/payment.service';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { Payment } from '../../types/payment';

export const PaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await paymentService.getPaymentHistory({
          page: currentPage,
          limit: 10
        });
        
        if (response.success && response.data) {
          setPayments(response.data);
          setTotalPages(response.pagination.totalPages);
        } else {
          setError('No payment data available');
          setPayments([]);
        }
      } catch (err) {
        console.error('Error fetching payment history:', err);
        setError('Failed to load payment history');
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [currentPage]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card className="p-4">
        <p className="text-gray-500 dark:text-gray-400">No payment history available</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <Card key={payment._id} className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">
                {payment.paymentMethod}
                {payment.offlineDetails && ` (${payment.offlineDetails.paymentMode})`}
              </p>
              {payment.offlineDetails && (
                <div className="text-sm text-gray-500 mt-1">
                  <p>Reference: {payment.offlineDetails.referenceNumber}</p>
                  {payment.offlineDetails.notes && (
                    <p>Notes: {payment.offlineDetails.notes}</p>
                  )}
                </div>
              )}
            </div>
            <div className="text-right">
              <p className={`text-sm ${
                payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {payment.status}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};