// src/components/payment/PaymentForm.tsx
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { paymentService } from '../../services/payment.service';

interface PaymentFormProps {
  amount: number;
  serviceId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  serviceId,
  onSuccess,
  onCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay'>('stripe');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payment = await paymentService.createPayment({
        amount,
        currency: 'INR',
        paymentMethod,
        serviceId
      });

      if (paymentMethod === 'razorpay') {
        // Handle Razorpay payment flow
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: 'INR',
          order_id: payment.razorpayOrderId,
          handler: async (response: any) => {
            await paymentService.verifyRazorpayPayment(response);
            onSuccess();
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Handle Stripe payment flow
        // Implement Stripe Elements or Checkout
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
            onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'razorpay')}
            className="w-full p-2 border rounded-lg"
          >
            <option value="stripe">Stripe</option>
            <option value="razorpay">Razorpay</option>
          </select>
        </div>

        <div>
          <p className="text-lg font-medium">Amount: ₹{amount}</p>
        </div>

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
