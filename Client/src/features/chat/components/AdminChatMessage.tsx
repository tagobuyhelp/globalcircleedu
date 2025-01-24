import React from 'react';
import { cn } from '../../../utils/cn';
import type { ChatMessage } from '../types';

interface AdminChatMessageProps {
  message: ChatMessage;
  isAdmin: boolean;
}

export const AdminChatMessage: React.FC<AdminChatMessageProps> = ({ message, isAdmin }) => {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] space-y-1",
        isAdmin ? "ml-auto items-end" : "items-start"
      )}
    >
      <div className={cn(
        "px-4 py-2 rounded-lg",
        isAdmin 
          ? "bg-blue-600 text-white" 
          : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
      )}>
        {message.message}
      </div>
      <span className="text-xs text-gray-500">
        {new Date(message.createdAt).toLocaleTimeString()}
      </span>
    </div>
  );
};