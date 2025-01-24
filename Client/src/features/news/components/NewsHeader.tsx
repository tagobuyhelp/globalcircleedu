import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import { getImageUrl } from '../../../utils/imageUrl';
import type { News } from '../types/news';

interface NewsHeaderProps {
  news: News;
}

export const NewsHeader: React.FC<NewsHeaderProps> = ({ news }) => {
  const imageUrl = getImageUrl(news.imageUrl);
  
  return (
    <header className="relative">
      {imageUrl && (
        <div className="aspect-video w-full">
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {/* Rest of the component remains the same */}
    </header>
  );
};