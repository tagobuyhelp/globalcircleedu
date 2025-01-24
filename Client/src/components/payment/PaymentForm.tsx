import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  CreditCard, 
  Smartphone, 
  DollarSign, 
  Receipt, 
  Building2, 
  FileText,
  AlertCircle 
} from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offlineDetails, setOfflineDetails] = useState({
    paymentMode: 'cash',
    referenceNumber: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (paymentMethod === 'offline') {
        await paymentService.createPayment({
          amount,
          currency: 'INR',
          paymentMethod: 'offline',
          serviceId,
          offlineDetails
        });
        onSuccess();
        return;
      }

      const payment = await paymentService.createPayment({
        amount,
        currency: 'INR',
        paymentMethod,
        serviceId
      });

      if (paymentMethod === 'razorpay') {
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative w-full max-w-md mx-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
            Payment Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Select Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="stripe">💳 Pay with Credit/Debit Card (Stripe)</option>
                <option value="razorpay">📱 Pay with UPI/Net Banking (Razorpay)</option>
                {isAdmin && <option value="offline">💰 Direct Payment (Cash/Cheque/Bank Transfer)</option>}
              </select>
            </div>

            {paymentMethod === 'offline' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <Receipt className="w-4 h-4 mr-2 text-gray-500" />
                    Payment Mode
                  </label>
                  <select
                    value={offlineDetails.paymentMode}
                    onChange={(e) => setOfflineDetails(prev => ({ ...prev, paymentMode: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="cash">💵 Cash Payment</option>
                    <option value="cheque">📑 Cheque/DD</option>
                    <option value="bank_transfer">🏦 Bank Transfer/NEFT/RTGS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    Reference Number
                  </label>
                  <input
                    type="text"
                    value={offlineDetails.referenceNumber}
                    onChange={(e) => setOfflineDetails(prev => ({ ...prev, referenceNumber: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter cheque number or transaction reference"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    Additional Notes
                  </label>
                  <textarea
                    value={offlineDetails.notes}
                    onChange={(e) => setOfflineDetails(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    placeholder="Enter any additional payment details or remarks"
                  />
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Amount to Pay:
                </span>
                <span className="text-xl font-bold">₹{amount.toLocaleString()}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="min-w-[150px]">
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Pay ₹{amount.toLocaleString()}
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};