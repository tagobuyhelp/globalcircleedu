import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { visitorApi } from '../../features/visitors/api/visitorApi';
import type { Visitor } from '../../features/visitors/types/visitor';

export const AgentVisitors = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await visitorApi.getAll();
        setVisitors(response.visitors);
      } catch (err) {
        console.error('Error fetching visitors:', err);
        setError('Failed to load visitors');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Visitor Management</h1>
        <Button>Add Visitor</Button>
      </div>

      <div className="grid gap-4">
        {visitors.map((visitor) => (
          <Card key={visitor.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{visitor.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{visitor.email}</p>
                {visitor.phone && (
                  <p className="text-sm text-gray-500">{visitor.phone}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {visitor.interests?.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-x-2">
                <Button variant="secondary" size="sm">Contact</Button>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};