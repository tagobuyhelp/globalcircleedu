import React, { useState, useEffect } from 'react';
import { visitorStatsApi } from '../../features/visitors/api/visitorStatsApi';
import { VisitorStatsOverview } from '../../features/visitors/components/stats/VisitorStatsOverview';
import { VisitorDistributionStats } from '../../features/visitors/components/stats/VisitorDistributionStats';
import { VisitorTrendStats } from '../../features/visitors/components/stats/VisitorTrendStats';
import type { VisitorStats as VisitorStatsType } from '../../features/visitors/types/stats';

export const VisitorStats = () => {
  const [stats, setStats] = useState<VisitorStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await visitorStatsApi.getStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load visitor statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading statistics...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!stats) return null;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Visitor Statistics</h1>
      
      <VisitorStatsOverview stats={stats} />
      <VisitorDistributionStats stats={stats} />
      <VisitorTrendStats stats={stats} />
    </div>
  );
};