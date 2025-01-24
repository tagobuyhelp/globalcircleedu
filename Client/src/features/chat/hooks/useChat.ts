// src/features/chat/hooks/useChat.ts
import { useState } from 'react'; // Add this import
import { useAuthStore } from '../../../store/authStore';
import { chatApi } from '../api/chatApi';
import type { ChatMessage } from '../types';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeVisitor, setActiveVisitor] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { user } = useAuthStore();

  const sendMessage = async (message: string) => {
    try {
      if (!user) throw new Error('User not authenticated');
      const newMessage = await chatApi.sendVisitorMessage(message);
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      console.error('Failed to send message:', err);
      throw err;
    }
  };

  const markAsRead = async () => {
    try {
      await chatApi.markMessagesAsRead();
      setMessages(prev =>
        prev.map(msg => (msg.isFromAdmin ? { ...msg, read: true } : msg))
      );
    } catch (err) {
      console.error('Failed to mark messages as read:', err);
    }
  };

  const loadChatHistory = async (visitorId: string) => {
    try {
      setLoading(true);
      const data = await chatApi.getVisitorMessages(visitorId);
      setMessages(data.messages);
    } catch (err) {
      console.error('Failed to load chat history:', err);
      setError('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  const openChat = (visitorId: string) => {
    setActiveVisitor(visitorId);
    setIsChatOpen(true);
    loadChatHistory(visitorId);
    markAsRead();
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    markAsRead,
    openChat,
    activeVisitor,
    isChatOpen,
    closeChat: () => setIsChatOpen(false)
  };
}
