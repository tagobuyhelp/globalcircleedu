import axios from '../../../lib/axios';
import type { News } from '../types/news';

export const newsApi = {
  getAll: async (page = 1, limit = 10) => {
    const { data } = await axios.get(`/news/news?page=${page}&limit=${limit}`);
    return {
      success: data.success,
      data: {
        news: data.data.news,
        pagination: data.data.pagination
      }
    };
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/news/news/${id}`);
    return data.data;
  },

  create: async (formData: FormData) => {
    const { data } = await axios.post('/news/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  update: async (id: string, formData: FormData) => {
    const { data } = await axios.put(`/news/news/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`/news/news/${id}`);
    return data;
  },

  getRelated: async (id: string) => {
    const { data } = await axios.get(`/news/news/${id}/related`);
    return data.data;
  }
};
