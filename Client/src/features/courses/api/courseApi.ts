import axios from '../../../lib/axios';
import type { Course } from '../types/course';

export const courseApi = {
  getAll: async () => {
    const { data } = await axios.get<Course[]>('/course/courses');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get<{ success: boolean; course: Course }>(`/course/courses/${id}`);
    return data.course;
  },

  create: async (courseData: Omit<Course, '_id'>) => {
    const { data } = await axios.post('/course/courses', courseData);
    return data;
  },

  update: async (id: string, courseData: Partial<Course>) => {
    const { data } = await axios.put(`/course/courses/${id}`, courseData);
    return data;
  },

  delete: async (id: string) => {
    await axios.delete(`/course/courses/${id}`);
  }
};