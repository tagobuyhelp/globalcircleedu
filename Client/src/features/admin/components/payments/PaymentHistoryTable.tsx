import React from 'react';
import { Card } from '../../../../components/ui/Card';
import { ArrowUpDown } from 'lucide-react';
import type { Payment } from '../../../../types/payment';

interface PaymentHistoryTableProps {
  payments: Payment[];
  sortField: keyof Payment;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Payment) => void;
}

export const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  payments,
  sortField,
  sortDirection,
  onSort
}) => {
  const SortableHeader: React.FC<{ field: keyof Payment; children: React.ReactNode }> = ({ field, children }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <ArrowUpDown className={`w-4 h-4 ${sortField === field ? 'text-blue-500' : 'text-gray-400'}`} />
      </div>
    </th>
  );

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <SortableHeader field="createdAt">Date</SortableHeader>
              <SortableHeader field="service">Service</SortableHeader>
              <SortableHeader field="amount">Amount</SortableHeader>
              <SortableHeader field="paymentMethod">Method</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Reference
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {typeof payment.service === 'string' ? payment.service : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {payment.currency} {payment.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                  {payment.paymentMethod}
                  {payment.offlineDetails && ` (${payment.offlineDetails.paymentMode})`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    payment.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : payment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {payment.transactionId || payment.razorpayPaymentId || 
                   (payment.offlineDetails?.referenceNumber) || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};