// src/features/admin/components/WithdrawalList.tsx
import React from 'react';
import { WithdrawalCard } from './WithdrawalCard';
import type { WithdrawalRequest } from '../types';

interface WithdrawalListProps {
  withdrawals: WithdrawalRequest[];
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
}

export const WithdrawalList: React.FC<WithdrawalListProps> = ({
  withdrawals,
  onUpdateStatus,
}) => {
  return (
    <div className="space-y-4">
      {withdrawals.map((withdrawal) => (
        <WithdrawalCard
          key={withdrawal._id}
          withdrawal={withdrawal}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};
