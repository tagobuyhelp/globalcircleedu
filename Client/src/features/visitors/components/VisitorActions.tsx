// src/features/visitors/components/VisitorActions.tsx
import React from 'react';
import { MessageSquare, FileText } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useChat } from '../../../features/chat/hooks/useChat';

interface VisitorActionsProps {
  visitorId: string;
  onViewDocuments: () => void;
}

export const VisitorActions: React.FC<VisitorActionsProps> = ({
  visitorId,
  onViewDocuments,
}) => {
  // Get the openChat function from the chat hook
  const { openChat } = useChat();

  const handleChatClick = () => {
    if (typeof openChat === 'function') {
      openChat(visitorId);
    }
  };

  return (
    <div className="flex space-x-2">

      <Button
        variant="outline"
        size="sm"
        onClick={onViewDocuments}
        className="flex items-center"
      >
        <FileText className="w-4 h-4 mr-1" />
        Documents
      </Button>
    </div>
  );
};
