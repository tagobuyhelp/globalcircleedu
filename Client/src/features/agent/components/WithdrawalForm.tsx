import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import type { PaymentMethod } from '../types';

interface WithdrawalFormProps {
  availableBalance: number;
  onSubmit: (amount: number) => Promise<void>;
  isLoading?: boolean;
}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  availableBalance,
  onSubmit,
  isLoading
}) => {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && amount <= availableBalance) {
      onSubmit(amount);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Request Withdrawal</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Amount (Available: ${availableBalance})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={0}
            max={availableBalance}
            step={0.01}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || amount <= 0 || amount > availableBalance}
          className="w-full"
        >
          {isLoading ? 'Processing...' : 'Request Withdrawal'}
        </Button>
      </form>
    </Card>
  );
};