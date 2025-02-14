import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, FileText, DollarSign, Briefcase, Clock, CheckCircle } from 'lucide-react';
import { agentApi } from '../../features/agent/api/agentApi';
import { WithdrawalForm } from '../../features/agent/components/WithdrawalForm';
import { PaymentMethodForm } from '../../features/agent/components/PaymentMethodForm';
import toast from 'react-hot-toast';
import type { PaymentMethod, PaymentDetails, AgentStats } from '../../features/agent/types';

export const AgentDashboard = () => {
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await agentApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async (amount: number) => {
    try {
      await agentApi.requestWithdrawal(amount);
      toast.success('Withdrawal request submitted successfully');
      setShowWithdrawalForm(false);
      fetchStats(); // Refresh stats
    } catch (err) {
      console.error('Error requesting withdrawal:', err);
      toast.error('Failed to submit withdrawal request');
    }
  };

  const handlePaymentMethodUpdate = async (data: { 
    type: PaymentMethod; 
    details: PaymentDetails 
  }) => {
    try {
      await agentApi.updatePaymentMethod(data);
      toast.success('Payment method updated successfully');
      setShowPaymentForm(false);
    } catch (err) {
      console.error('Error updating payment method:', err);
      toast.error('Failed to update payment method');
    }
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Visitors',
      value: stats.visitorCount || 0,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications || 0,
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Total Commission',
      value: `$${(stats.totalCommission || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Available Balance',
      value: `$${(stats.availableBalance || 0).toLocaleString()}`,
      icon: Briefcase,
      color: 'purple'
    }
  ];

  const applicationStats = [
    {
      title: 'Pending Applications',
      value: stats.pendingApplications || 0,
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Approved Applications',
      value: stats.approvedApplications || 0,
      icon: CheckCircle,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        <div className="space-x-4">
          <Button onClick={() => setShowPaymentForm(true)}>
            Update Payment Method
          </Button>
          <Button onClick={() => setShowWithdrawalForm(true)}>
            Request Withdrawal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applicationStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Withdrawal Form Modal */}
      {showWithdrawalForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <WithdrawalForm
              availableBalance={stats.availableBalance || 0}
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