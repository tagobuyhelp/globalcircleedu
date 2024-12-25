export interface University {
  id: string;
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
  courses: string[];
  createdAt: string;
  updatedAt: string;
}