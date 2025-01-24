import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Calendar, User } from 'lucide-react';
import { getDefaultNewsImage } from '../../../utils/images';
import type { News } from '../types/news';

interface NewsCardProps {
  news: News;
  onClick?: (newsId: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  const imageUrl = news.imageUrl || getDefaultNewsImage();

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(news._id)}
    >
      <img
        src={imageUrl}
        alt={news.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = getDefaultNewsImage();
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{news.title}</h3>
        
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{news.author}</span>
          </div>
        </div>
        
        <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
          {news.content}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {news.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};