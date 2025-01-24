import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { NewsForm } from '../../features/news/components/NewsForm';
import { newsApi } from '../../features/news/api/newsApi';
import type { News } from '../../features/news/types/news';

export const AdminNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

 const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getAll();
      // Ensure we have an array of news items, even if empty
      setNews(response?.data?.news || []);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: FormData) => {
    try {
      await newsApi.create(formData);
      setIsFormOpen(false);
      fetchNews();
    } catch (err) {
      console.error('Error creating news:', err);
    }
  };

   const handleUpdate = async (id: string, formData: FormData) => {
    try {
      await newsApi.update(id, formData);
      setIsFormOpen(false);
      setSelectedNews(null);
      fetchNews();
    } catch (err) {
      console.error('Error updating news:', err);
    }
  };


 const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) return;
    try {
      await newsApi.delete(id);
      fetchNews();
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

 // Only filter if we have news items
  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading news...</div>;
  if (error) return <div className="text-red-600">{error}</div>;


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">News Management</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add News
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredNews.map((item) => (
          <Card key={item._id} className="p-6">
            <div className="flex gap-6">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{item.author}</span>
                      <span>•</span>
                      <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {item.content}
                    </p>
                    {item.tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedNews(item);
                        setIsFormOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <NewsForm
          news={selectedNews}
          onSubmit={selectedNews ? 
            (formData) => handleUpdate(selectedNews._id, formData) : 
            handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedNews(null);
          }}
        />
      )}
    </div>
  );
};