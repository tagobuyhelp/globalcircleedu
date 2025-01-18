import React from 'react';
import { AdminChatList } from '../../features/chat/components/AdminChatList';

export const AdminChat = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chat Management</h1>
      <AdminChatList />
    </div>
  );
};