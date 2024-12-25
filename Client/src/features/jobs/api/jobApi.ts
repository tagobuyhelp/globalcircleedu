import axios from '../../../lib/axios';
import type { JobsResponse } from '../types/job';

export const jobApi = {
  getAll: async () => {
    const { data } = await axios.get<JobsResponse>('/job/jobs');
    return data.jobs;
  },
};