import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import type { PaymentMethod, PaymentDetails } from '../types';

interface PaymentMethodFormProps {
  onSubmit: (data: { paymentMethod: PaymentMethod; paymentDetails: PaymentDetails }) => Promise<void>;
  currentMethod?: PaymentMethod;
  currentDetails?: PaymentDetails;
  isLoading?: boolean;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  onSubmit,
  currentMethod = 'bank_transfer',
  currentDetails = {},
  isLoading
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(currentMethod);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(currentDetails);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ paymentMethod, paymentDetails });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>

        {paymentMethod === 'bank_transfer' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Bank Name</label>
              <input
                type="text"
                value={paymentDetails.bankName || ''}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, bankName: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Account Number</label>
              <input
                type="text"
                value={paymentDetails.accountNumber || ''}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Account Holder Name</label>
              <input
                type="text"
                value={paymentDetails.accountHolderName || ''}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </>
        )}

        {paymentMethod === 'paypal' && (
          <div>
            <label className="block text-sm font-medium mb-1">PayPal Email</label>
            <input
              type="email"
              value={paymentDetails.paypalEmail || ''}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, paypalEmail: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        )}

        {paymentMethod === 'stripe' && (
          <div>
            <label className="block text-sm font-medium mb-1">Stripe Account ID</label>
            <input
              type="text"
              value={paymentDetails.stripeAccountId || ''}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, stripeAccountId: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Payment Method'}
        </Button>
      </form>
    </Card>
  );
};