// src/features/courses/api/courseApi.ts

import axios from '../../../lib/axios';
import type { Course } from '../types/course';

export const courseApi = {
  getAll: async () => {
    const { data } = await axios.get('/course/courses');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`/course/courses/${id}`);
    return data.course;
  },

  create: async (courseData: Omit<Course, '_id'>) => {
    const { data } = await axios.post('/course/create', courseData);
    return data.course;
  },

  update: async (id: string, courseData: Partial<Course>) => {
    const { data } = await axios.put(`/course/courses/${id}`, courseData);
    return data.course;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`/course/courses/${id}`);
    return data;
  }
};
