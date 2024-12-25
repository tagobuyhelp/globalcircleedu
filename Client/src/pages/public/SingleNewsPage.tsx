import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { NewsHeader } from '../../features/news/components/NewsHeader';
import { NewsContent } from '../../features/news/components/NewsContent';
import { ShareButtons } from '../../features/news/components/ShareButtons';
import { RelatedNews } from '../../features/news/components/RelatedNews';
import { newsApi } from '../../features/news/api/newsApi';
import type { News } from '../../features/news/types/news';

export const SingleNewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!id) {
          setError('News article not found');
          return;
        }
        const newsData = await newsApi.getById(id);
        setNews(newsData);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news article');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading article..." />;
  if (error || !news) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Article not found'}</p>
        <Link to="/news" className="text-blue-600 hover:text-blue-700">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${news.title} | Global Circle Edu News`}</title>
        <meta name="description" content={news.content.substring(0, 155)} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/news" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to News
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <NewsHeader news={news} />
          <NewsContent news={news} />
          <ShareButtons news={news} />
        </article>

        {news.category && <RelatedNews category={news.category} currentId={news._id} />}
      </div>
      <Footer />
    </>
  );
};