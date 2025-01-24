export interface Visitor {
  _id: string;
  name: string;
  email: string;
}

export interface ChatMessage {
  _id: string;
  visitorId: {
    _id: string;
    name: string;
    email: string;
  };
  message: string;
  isFromAdmin: boolean;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatPagination {
  messages: ChatMessage[];
  currentPage: number;
  totalPages: number;
  totalMessages: number;
}

export interface AdminConversations {
  conversations: Record<string, ChatMessage[]>;
  currentPage: number;
  totalPages: number;
  totalVisitors: number;
}