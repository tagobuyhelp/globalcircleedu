import React, { useEffect, useState } from 'react';
import { NewsCard } from './NewsCard';
import { newsApi } from '../api/newsApi';
import type { News } from '../types/news';

interface RelatedNewsProps {
  category: string;
  currentId: string;
}

export const RelatedNews: React.FC<RelatedNewsProps> = ({ category, currentId }) => {
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      try {
        const allNews = await newsApi.getAll();
        const filtered = allNews
          .filter(news => news._id !== currentId && news.category === category)
          .slice(0, 3);
        setRelatedNews(filtered);
      } catch (error) {
        console.error('Error fetching related news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedNews();
  }, [category, currentId]);

  if (loading || relatedNews.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedNews.map((news) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </div>
    </section>
  );
};