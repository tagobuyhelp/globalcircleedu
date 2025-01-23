import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DollarSign, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';
import { agentApi } from '../../features/agent/api/agentApi';
import { WithdrawalForm } from '../../features/agent/components/WithdrawalForm';
import { PaymentMethodForm } from '../../features/agent/components/PaymentMethodForm';
import toast from 'react-hot-toast';
import type { WithdrawalRequest, Commission, AgentStats } from '../../features/agent/types';

export const AgentEarnings = () => {
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsData, withdrawalsData, commissionsData] = await Promise.all([
        agentApi.getStats(),
        agentApi.getWithdrawalRequests(),
        agentApi.getCommissionHistory()
      ]);
      setStats(statsData);
      setWithdrawals(withdrawalsData);
      setCommissions(commissionsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to load earnings data');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async (amount: number) => {
    try {
      await agentApi.requestWithdrawal(amount);
      toast.success('Withdrawal request submitted successfully');
      setShowWithdrawalForm(false);
      fetchData(); // Refresh data
    } catch (err) {
      console.error('Error requesting withdrawal:', err);
      toast.error('Failed to submit withdrawal request');
    }
  };

  const handlePaymentMethodUpdate = async (data: any) => {
    try {
      await agentApi.updatePaymentMethod(data);
      toast.success('Payment method updated successfully');
      setShowPaymentForm(false);
    } catch (err) {
      console.error('Error updating payment method:', err);
      toast.error('Failed to update payment method');
    }
  };

  if (loading) return <div>Loading earnings data...</div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Earnings</h1>
        <div className="space-x-4">
          <Button onClick={() => setShowPaymentForm(true)}>
            Update Payment Method
          </Button>
          <Button onClick={() => setShowWithdrawalForm(true)}>
            Request Withdrawal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Commission
              </p>
              <h3 className="text-2xl font-bold">${stats.commissionEarned.toLocaleString()}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <ArrowUpRight className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Available Balance
              </p>
              <h3 className="text-2xl font-bold">${stats.availableBalance.toLocaleString()}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Withdrawals
              </p>
              <h3 className="text-2xl font-bold">
                ${withdrawals
                  .filter(w => w.status === 'Pending')
                  .reduce((sum, w) => sum + w.amount, 0)
                  .toLocaleString()}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Balance
              </p>
              <h3 className="text-2xl font-bold">
                ${stats.totalBalance.toLocaleString()}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Commission History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Commission History</h2>
        <div className="space-y-4">
          {commissions.map((commission) => (
            <div
              key={commission._id}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <p className="font-medium">${commission.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  {new Date(commission.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                commission.status === 'Paid'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {commission.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Withdrawal History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Withdrawal History</h2>
        <div className="space-y-4">
          {withdrawals.map((withdrawal) => (
            <div
              key={withdrawal._id}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <p className="font-medium">${withdrawal.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  {new Date(withdrawal.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                withdrawal.status === 'Approved'
                  ? 'bg-green-100 text-green-800'
                  : withdrawal.status === 'Rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {withdrawal.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Withdrawal Form Modal */}
      {showWithdrawalForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <WithdrawalForm
              availableBalance={stats.availableBalance}
              onSubmit={handleWithdrawal}
            />
          </div>
        </div>
      )}

      {/* Payment Method Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <PaymentMethodForm
              onSubmit={handlePaymentMethodUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};