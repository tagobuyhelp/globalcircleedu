import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { authApi } from '../../services/auth/authApi';
import type { AuthUser } from '../../types/auth';

export const AdminUsers = () => {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authApi.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>Add User</Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {user.role}
                  </span>
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};