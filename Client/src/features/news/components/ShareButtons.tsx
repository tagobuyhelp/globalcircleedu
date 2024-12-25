import React from 'react';
import { Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import type { News } from '../types/news';

interface ShareButtonsProps {
  news: News;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ news }) => {
  const currentUrl = window.location.href;
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(news.title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(news.title)}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Share this article</h3>
      <div className="flex space-x-4">
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-800"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <button
          onClick={copyToClipboard}
          className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Copy link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};