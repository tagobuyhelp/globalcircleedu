export interface University {
  _id: string;
  name: string;
  location: string;
  country: string;
  ranking: number;
  type: 'Private' | 'Public';
  established: string;
  acceptanceRate: number;
  numberOfStudents: number;
  logo: string;
  campusPhotos: string[];
  description?: string;
  courses: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUniversityInput extends Omit<University, '_id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateUniversityInput extends Partial<CreateUniversityInput> {}