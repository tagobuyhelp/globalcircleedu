import axios from '../../../lib/axios';
import type { ChatMessage } from '../types';

export const chatApi = {
  // Send message as visitor
  sendVisitorMessage: async (message: string) => {
    const { data } = await axios.post('/chat/visitor', { message });
    return data.data;
  },

  // Get messages for visitor
  getVisitorMessages: async (page = 1, limit = 20) => {
    const { data } = await axios.get(`/chat/visitor?page=${page}&limit=${limit}`);
    return data.data;
  },

  // Mark messages as read
  markMessagesAsRead: async () => {
    const { data } = await axios.put('/chat/visitor/read');
    return data;
  },

  // Admin: Send message
  sendAdminMessage: async (visitorId: string, message: string) => {
    const { data } = await axios.post('/chat/admin', { visitorId, message });
    return data.data;
  },

  // Admin: Get all conversations
  getAdminMessages: async (page = 1, limit = 20) => {
    const { data } = await axios.get(`/chat/admin?page=${page}&limit=${limit}`);
    return data.data;
  }
};