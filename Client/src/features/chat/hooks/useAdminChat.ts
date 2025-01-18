import { useState, useEffect } from 'react';
import { chatApi } from '../api/chatApi';
import type { ChatMessage, AdminConversations } from '../types';

export function useAdminChat() {
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await chatApi.getAdminMessages();
        setConversations(data.conversations);
      } catch (err) {
        console.error('Failed to load conversations:', err);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (visitorId: string, message: string) => {
    try {
      const newMessage = await chatApi.sendAdminMessage(visitorId, message);
      setConversations(prev => ({
        ...prev,
        [visitorId]: [newMessage, ...(prev[visitorId] || [])]
      }));
      return newMessage;
    } catch (err) {
      console.error('Failed to send message:', err);
      throw err;
    }
  };

  return {
    conversations,
    loading,
    error,
    sendMessage
  };
}