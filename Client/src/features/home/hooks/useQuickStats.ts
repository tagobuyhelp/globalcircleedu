import { useState, useEffect } from 'react';
import { featuredApi } from '../api/featuredApi';
import { quickStats } from '../data/statsData';

export const useQuickStats = () => {
  const [stats, setStats] = useState(quickStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await featuredApi.getQuickStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching quick stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};