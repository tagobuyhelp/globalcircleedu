import React, { createContext, useContext, useState } from 'react';
import { ChatWidget } from './ChatWidget';

interface ChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType>({
  isOpen: false,
  openChat: () => {},
  closeChat: () => {},
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat }}>
      {children}
      <ChatWidget />
    </ChatContext.Provider>
  );
};