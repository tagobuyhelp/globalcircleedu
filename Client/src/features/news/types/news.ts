export interface News {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsResponse {
  success: boolean;
  newsList: News[];
}