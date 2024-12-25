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
  color: 'indigo' | 'blue' | 'emerald' | 'violet';
  items: FeaturedItem[];
  viewAllLink: string;
}