import axios from '../../../lib/axios';
import type { News } from '../types/news';

export const newsApi = {
  getAll: async (page = 1, limit = 9) => {
    const { data } = await axios.get(`/news/news?page=${page}&limit=${limit}`);
    return {
      data: data.data.news,
      totalPages: data.data.pagination.totalPages,
      currentPage: data.data.pagination.currentPage,
      total: data.data.pagination.totalItems
    };
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/news/news/${id}`);
    return data.data; // Return the news object directly from data.data
  },

  getRelated: async (category: string, currentId: string) => {
    const { data } = await axios.get(`/news/news/${currentId}/related`);
    return data.data.news;
  }
};