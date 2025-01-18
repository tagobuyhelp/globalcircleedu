import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { paymentService } from '../../services/payment.service';

interface PaymentFormProps {
  amount: number;
  serviceId: string;
  onSuccess: () => void;
  onCancel: () => void;
  isAdmin?: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  serviceId,
  onSuccess,
  onCancel,
  isAdmin = false
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay' | 'offline'>('stripe');
  const [partialAmount, setPartialAmount] = useState<number>(amount);
  const [offlineDetails, setOfflineDetails] = useState({
    paymentMode: 'cash',
    referenceNumber: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (paymentMethod === 'offline') {
        await paymentService.createPayment({
          amount: partialAmount,
          currency: 'INR',
          paymentMethod: 'offline',
          serviceId,
          offlineDetails
        });
        onSuccess();
        return;
      }

      const payment = await paymentService.createPayment({
        amount: partialAmount,
        currency: 'INR',
        paymentMethod: paymentMethod as 'stripe' | 'razorpay',
        serviceId
      });

      if (paymentMethod === 'razorpay') {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: partialAmount * 100,
          currency: 'INR',
          order_id: payment.razorpayOrderId,
          handler: async (response: any) => {
            await paymentService.verifyRazorpayPayment(response);
            onSuccess();
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else if (paymentMethod === 'stripe') {
        // Handle Stripe payment flow
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="stripe">Stripe</option>
            <option value="razorpay">Razorpay</option>
            {isAdmin && <option value="offline">Offline Payment</option>}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={partialAmount}
              onChange={(e) => setPartialAmount(Math.min(Number(e.target.value), amount))}
              min={1}
              max={amount}
              className="w-full p-2 border rounded-lg"
            />
            <span className="text-sm text-gray-500">/ ₹{amount}</span>
          </div>
        </div>

        {paymentMethod === 'offline' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Payment Mode</label>
              <select
                value={offlineDetails.paymentMode}
                onChange={(e) => setOfflineDetails(prev => ({ ...prev, paymentMode: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              >
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reference Number</label>
              <input
                type="text"
                value={offlineDetails.referenceNumber}
                onChange={(e) => setOfflineDetails(prev => ({ ...prev, referenceNumber: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                placeholder="Cheque/Transaction number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={offlineDetails.notes}
                onChange={(e) => setOfflineDetails(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Additional payment details"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </form>
    </Card>
  );
};