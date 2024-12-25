import axios from 'axios';
import { API_URL } from '../../../config/api';
import type { VisitorStats } from '../types/stats';

export const visitorStatsApi = {
  getStats: async (): Promise<VisitorStats> => {
    const { data } = await axios.get<{ data: VisitorStats }>(
      `${API_URL}/visitor/stats`
    );
    return data.data;
  }
};