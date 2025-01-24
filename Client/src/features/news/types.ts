export interface News {
  id: string;
  title: string;
  content: string;
  image?: string;
  publishDate: string;
  author: string;
  category: string[];
}