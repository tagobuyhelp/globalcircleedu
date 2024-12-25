import { featureIcons, featureColors } from '../constants/featureIcons';
import type { FeaturedContent, Feature } from '../types';

export function mapFeatureContent(content: FeaturedContent): Feature[] {
  return [
    {
      title: 'Featured Courses',
      icon: featureIcons.courses,
      color: featureColors.courses,
      viewAllLink: '/courses',
      items: content.courses.map(course => ({
        title: course.name,
        institution: course.program.university.name,
        duration: course.duration,
        link: `/courses/${course._id}`
      }))
    },
    {
      title: 'Top Universities',
      icon: featureIcons.universities,
      color: featureColors.universities,
      viewAllLink: '/universities',
      items: content.universities.map(uni => ({
        title: uni.name,
        location: uni.location,
        ranking: `#${uni.ranking}`,
        link: `/universities/${uni.id}`
      }))
    },
    {
      title: 'Latest Jobs',
      icon: featureIcons.jobs,
      color: featureColors.jobs,
      viewAllLink: '/jobs',
      items: content.jobs.map(job => ({
        title: job.title,
        company: job.company,
        location: job.location,
        link: `/jobs/${job._id}`
      }))
    },
    {
      title: 'Recent News',
      icon: featureIcons.news,
      color: featureColors.news,
      viewAllLink: '/news',
      items: content.news.map(item => ({
        title: item.title,
        date: new Date(item.publishedAt).toLocaleDateString(),
        link: `/news/${item._id}`
      }))
    }
  ];
}