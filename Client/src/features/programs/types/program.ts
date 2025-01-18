export interface Program {
  _id: string;
  name: string;
  description?: string;
  duration: string;
  fee: number;
  degree: {
    _id: string;
    name: string;
  };
  university: {
    _id: string;
    name: string;
  };
  prerequisites: string[];
  availableSeats: number;
  applicationDeadline?: string;
  createdAt: string;
  updatedAt: string;
}