// src/components/payment/PaymentHistory.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { paymentService } from '../../services/payment.service';

export const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await paymentService.getPaymentHistory();
        setPayments(data);
      } catch (err) {
        console.error('Error fetching payment history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="space-y-4">
      {payments.map((payment: any) => (
        <Card key={payment._id} className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">₹{payment.amount}</p>
              <p className="text-sm text-gray-600">{payment.paymentMethod}</p>
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
    </div>
  );
};
