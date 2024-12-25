import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsCard } from '../../features/news/components/NewsCard';
import { Footer } from '../../components/layout/Footer';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { newsApi } from '../../features/news/api/newsApi';
import type { News } from '../../features/news/types/news';

const ITEMS_PER_PAGE = 9;

export const NewsPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsApi.getAll(currentPage, ITEMS_PER_PAGE);
        setNews(response.data);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const filteredNews = searchTerm 
    ? news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : news;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <LoadingSpinner message="Loading news..." />;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;

  return (
    <>
      <Helmet>
        <title>Latest News | Global Circle Edu</title>
        <meta name="description" content="Stay updated with the latest news and updates from Global Circle Edu. Read about education, technology, and global opportunities." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Latest News</h1>
          
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
        </div>

        {filteredNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <NewsCard
                  key={item._id}
                  news={item}
                  onClick={(newsId) => navigate(`/news/${newsId}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            {!searchTerm && totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                    className="min-w-[2.5rem]"
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No news articles found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};