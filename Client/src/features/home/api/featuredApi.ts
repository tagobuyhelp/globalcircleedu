import axios from '../../../lib/axios';
import type { Course } from '../../courses/types/course';
import type { University } from '../../universities/types/university';
import type { Job } from '../../jobs/types/job';
import type { News } from '../../news/types/news';

export const featuredApi = {
  getFeaturedContent: async () => {
    const [courses, universities, jobs, news] = await Promise.all([
      axios.get('/courses/featured').then(res => res.data),
      axios.get('/universities/featured').then(res => res.data),
      axios.get('/jobs/featured').then(res => res.data),
      axios.get('/news/featured').then(res => res.data)
    ]);

    return {
      courses: courses.slice(0, 4),
      universities: universities.slice(0, 4),
      jobs: jobs.slice(0, 4),
      news: news.slice(0, 4)
    };
  }
};