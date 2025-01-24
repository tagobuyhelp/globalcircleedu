import { GraduationCap, Building2, Briefcase, Newspaper } from 'lucide-react';

export const featureIcons = {
  courses: GraduationCap,
  universities: Building2,
  jobs: Briefcase,
  news: Newspaper,
} as const;

export const featureColors = {
  courses: 'indigo',
  universities: 'blue',
  jobs: 'emerald',
  news: 'violet',
} as const;