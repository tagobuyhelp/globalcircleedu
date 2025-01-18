// src/features/visitors/api/visitorStatsApi.ts
import axios from '../../../lib/axios';
import type { VisitorStats } from '../types/stats';

export const visitorStatsApi = {
  getStats: async (): Promise<VisitorStats> => {
    try {
      // Add error handling and default values
      const { data } = await axios.get('/visitor/stats');
      return data?.data || {
        basicStats: {
          totalVisitors: 0,
          studentCount: 0,
          workerCount: 0,
          totalDocumentsUploaded: 0
        },
        totalUniqueCountries: 0,
        totalCounts: {
          universities: 0,
          courses: 0,
          jobs: 0,
          news: 0
        },
        monthlyTrends: [],
        topCountries: [],
        educationLevelDistribution: [],
        preferredContactMethod: []
      };
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
      // Return default stats object on error
      return {
        basicStats: {
          totalVisitors: 0,
          studentCount: 0,
          workerCount: 0,
          totalDocumentsUploaded: 0
        },
        totalUniqueCountries: 0,
        totalCounts: {
          universities: 0,
          courses: 0,
          jobs: 0,
          news: 0
        },
        monthlyTrends: [],
        topCountries: [],
        educationLevelDistribution: [],
        preferredContactMethod: []
      };
    }
  }
};
