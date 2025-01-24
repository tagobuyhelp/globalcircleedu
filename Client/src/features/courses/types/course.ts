// src/features/courses/types/course.ts

export interface Course {
  _id: string;
  name: string;
  description?: string;
  program: {
    _id: string;
    name: string;
    degree: {
      _id: string;
      name: string;
    };
    university: {
      _id: string;
      name: string;
    };
  };
  credits: number;
  duration: string;
  instructor?: string;
  syllabus?: string;
  prerequisites: string[];
  mode: 'Online' | 'Offline' | 'Hybrid';
  fee: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseInput {
  name: string;
  description?: string;
  program: string;
  credits: number;
  duration: string;
  instructor?: string;
  syllabus?: string;
  prerequisites?: string[];
  mode: 'Online' | 'Offline' | 'Hybrid';
  fee: number;
}
