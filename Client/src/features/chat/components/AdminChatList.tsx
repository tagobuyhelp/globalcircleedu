import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { useAdminChat } from '../hooks/useAdminChat';
import { AdminChatMessage } from './AdminChatMessage';
import { ChatInput } from '../../../components/chat/ChatInput';
import type { ChatMessage } from '../types';

export const AdminChatList = () => {
  const { conversations, loading, sendMessage } = useAdminChat();
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);

  if (loading) return <div>Loading conversations...</div>;

  const selectedMessages = selectedVisitor ? conversations[selectedVisitor] : [];

  const handleSend = async (message: string) => {
    if (!selectedVisitor) return;
    await sendMessage(selectedVisitor, message);
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Visitors List */}
      <div className="col-span-4 overflow-y-auto border-r dark:border-gray-700">
        {Object.entries(conversations).map(([visitorId, messages]) => {
          const lastMessage = messages[messages.length - 1];
          const unreadCount = messages.filter(m => !m.read && !m.isFromAdmin).length;
          
          return (
            <Card
              key={visitorId}
              className={`p-4 mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedVisitor === visitorId ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedVisitor(visitorId)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{lastMessage.visitorId.name}</h3>
                  <p className="text-sm text-gray-500">{lastMessage.visitorId.email}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                    {lastMessage.message}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Chat Window */}
      <div className="col-span-8 flex flex-col bg-gray-50 dark:bg-gray-800 rounded-lg">
        {selectedVisitor ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedMessages.map((message: ChatMessage) => (
                <AdminChatMessage
                  key={message._id}
                  message={message}
                  isAdmin={message.isFromAdmin}
                />
              ))}
            </div>
            <div className="border-t dark:border-gray-700 p-4">
              <ChatInput onSend={handleSend} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};