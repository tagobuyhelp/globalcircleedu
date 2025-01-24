// Update your existing types.ts file

export interface Course {
  id: string;
  name: string;
  description: string;
  program: string;
  credits: number;
  duration: string;
  instructor: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  fee: number;
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseInput {
  name: string;
  description: string;
  program: string;
  credits: number;
  duration: string;
  instructor: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  fee: number;
  prerequisites?: string;
}

export interface UpdateCourseInput extends Partial<CreateCourseInput> {}