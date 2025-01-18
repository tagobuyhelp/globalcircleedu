import React from 'react';
import { MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';

interface ChatHeaderProps {
  isMinimized: boolean;
  isConnected: boolean;
  onMinimize: () => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  isConnected,
  onMinimize,
  onClose
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <MessageSquare className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold">Live Chat</h3>
        {isConnected && (
          <span className="w-2 h-2 bg-green-500 rounded-full" />
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onMinimize}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {isMinimized ? (
            <Maximize2 className="h-4 w-4" />
          ) : (
            <Minimize2 className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};