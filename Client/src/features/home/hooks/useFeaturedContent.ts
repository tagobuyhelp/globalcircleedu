import { useState, useEffect } from 'react';
import { featuredApi } from '../api/featuredApi';
import type { FeaturedContent } from '../types';

export function useFeaturedContent() {
  const [content, setContent] = useState<FeaturedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await featuredApi.getFeaturedContent();
        setContent(data);
      } catch (err) {
        console.error('Error fetching featured content:', err);
        setError('Failed to load featured content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
}