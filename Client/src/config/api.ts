export const API_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  VISITOR: {
    BASE: '/visitor',
    STATS: '/visitor/stats',
  },
  // Add other endpoints here
} as const;