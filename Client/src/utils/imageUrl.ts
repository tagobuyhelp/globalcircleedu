import { API_URL } from '../config/api';

export function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) return '';
  
  // If it's already a full URL (starts with http:// or https://)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If it's a relative path, prepend the API URL
  return `${API_URL}/${imageUrl.replace(/^\//, '')}`;
}