export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  requirements: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  postedAt: string;
}