import React from 'react';
import { cn } from '../../utils/cn';
import type { ChatMessage as ChatMessageType } from '../../features/chat/types';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] space-y-1",
        isOwnMessage ? "ml-auto items-end" : "items-start"
      )}
    >
      <div className={cn(
        "px-4 py-2 rounded-lg",
        isOwnMessage 
          ? "bg-blue-600 text-white" 
          : "bg-gray-100 text-gray-900"
      )}>
        {message.message}
      </div>
      <span className="text-xs text-gray-500">
        {new Date(message.createdAt).toLocaleTimeString()}
      </span>
    </div>
  );
};