import React from 'react';
import { Users, GraduationCap, Briefcase, Globe } from 'lucide-react';
import { StatsCard } from './StatsCard';
import type { VisitorStats } from '../../types/stats';

interface VisitorStatsOverviewProps {
  stats: VisitorStats;
}

export const VisitorStatsOverview: React.FC<VisitorStatsOverviewProps> = ({ stats }) => {
  const { basicStats, totalUniqueCountries } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Visitors"
        value={basicStats.totalVisitors}
        icon={Users}
        description="Total registered visitors"
      />
      <StatsCard
        title="Students"
        value={basicStats.studentCount}
        icon={GraduationCap}
        description={`${((basicStats.studentCount / basicStats.totalVisitors) * 100).toFixed(1)}% of total`}
      />
      <StatsCard
        title="Workers"
        value={basicStats.workerCount}
        icon={Briefcase}
        description={`${((basicStats.workerCount / basicStats.totalVisitors) * 100).toFixed(1)}% of total`}
      />
      <StatsCard
        title="Countries"
        value={totalUniqueCountries}
        icon={Globe}
        description="Unique countries represented"
      />
    </div>
  );
};