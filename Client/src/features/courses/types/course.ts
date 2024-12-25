export interface Course {
  _id: string;
  name: string;
  description: string;
  program: {
    _id: string;
    name: string;
    description: string;
    duration: string;
    fee: number;
    degree: {
      _id: string;
      name: string;
      abbreviation: string;
      description: string;
    };
    availableSeats: number;
    prerequisites: string[];
  };
  credits: number;
  duration: string;
  instructor: string;
  prerequisites: string[];
  mode: 'Online' | 'Offline' | 'Hybrid';
  fee: number;
  createdAt: string;
  updatedAt: string;
}