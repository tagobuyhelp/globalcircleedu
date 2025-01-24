import type { Course } from '../../courses/types/course';
import type { University } from '../../universities/types/university';
import type { Job } from '../../jobs/types/job';
import type { News } from '../../news/types/news';
import type { featureColors } from '../constants/featureIcons';

export interface FeaturedContent {
  courses: Course[];
  universities: University[];
  jobs: Job[];
  news: News[];
}

export interface FeaturedItem {
  title: string;
  institution?: string;
  company?: string;
  location?: string;
  duration?: string;
  date?: string;
  ranking?: string;
  link: string;
}

export interface Feature {
  title: string;
  icon: any;
  color: keyof typeof featureColors;
  items: FeaturedItem[];
  viewAllLink: string;
}