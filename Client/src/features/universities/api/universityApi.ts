import axios from '../../../lib/axios';
import type { University } from '../types/university';
import type { UniversityResponse, ApiResponse } from '../types/response';

export const universityApi = {
  getAll: async (page = 1) => {
    const { data } = await axios.get<ApiResponse<UniversityResponse>>(`/universities?page=${page}`);
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get<ApiResponse<University>>(`/universities/${id}`);
    return data;
  }
};