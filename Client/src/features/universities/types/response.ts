import type { University } from './university';

export interface UniversityResponse {
  universities: University[];
  currentPage: number;
  totalPages: number;
  totalUniversities: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}