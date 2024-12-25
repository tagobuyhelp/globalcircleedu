export interface User {
  id: string;
  email: string;
  name: string;
  role: 'visitor' | 'agent' | 'admin' | 'editor';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  university: string;
  duration: string;
  tuitionFee: number;
  country: string;
  level: 'undergraduate' | 'postgraduate' | 'phd';
  category: string[];
}

export interface University {
  id: string;
  name: string;
  country: string;
  ranking: number;
  description: string;
  image: string;
  courses: string[]; // Course IDs
}

export interface News {
  id: string;
  title: string;
  content: string;
  image?: string;
  publishDate: string;
  author: string;
  category: string[];
}