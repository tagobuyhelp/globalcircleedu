import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useChat } from '../../features/chat/hooks/useChat';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { cn } from '../../utils/cn';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { messages, loading, sendMessage, markAsRead } = useChat();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      markAsRead();
    }
  }, [isOpen, isMinimized]);

  const handleSend = async (message: string) => {
    if (!user) return;
    try {
      await sendMessage(message);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      ) : (
        <div className={cn(
          "w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-200",
          isMinimized ? "h-14" : "h-[600px]"
        )}>
          <ChatHeader
            isMinimized={isMinimized}
            isConnected={!loading}
            onMinimize={() => setIsMinimized(!isMinimized)}
            onClose={() => setIsOpen(false)}
          />

          {!isMinimized && (
            <>
              <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[calc(600px-120px)]">
                {messages.map((message) => (
                  <ChatMessage
                    key={message._id}
                    message={message}
                    isOwnMessage={!message.isFromAdmin}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              <ChatInput
                onSend={handleSend}
                disabled={loading}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};