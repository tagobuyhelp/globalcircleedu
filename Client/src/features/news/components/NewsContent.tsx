import React from 'react';
import type { News } from '../types/news';

interface NewsContentProps {
  news: News;
}

export const NewsContent: React.FC<NewsContentProps> = ({ news }) => {
  return (
    <div className="px-6 py-4">
      <div className="prose dark:prose-invert max-w-none">
        {news.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {news.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};