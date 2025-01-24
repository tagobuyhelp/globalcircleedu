export interface University {
  _id: string;
  name: string;
  description?: string;
  location: string;
  country: string;
  ranking: number;
  type: 'Private' | 'Public';
  established: string;
  acceptanceRate: number;
  numberOfStudents: number;
  logo: string;
  campusPhotos: string[];
  programs: Array<{
    _id: string;
    name: string;
    description?: string;
    duration: string;
    fee: number;
    degree: {
      _id: string;
      name: string;
    };
    prerequisites: string[];
    availableSeats: number;
    applicationDeadline?: string;
    courses: Array<{
      _id: string;
      name: string;
      description?: string;
      credits: number;
      duration: string;
      fee: number;
      mode: 'Online' | 'Offline' | 'Hybrid';
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUniversityInput extends Omit<University, '_id' | 'createdAt' | 'updatedAt' | 'programs'> {}
export interface UpdateUniversityInput extends Partial<CreateUniversityInput> {}