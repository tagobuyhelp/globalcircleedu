import axios from '../../../lib/axios';

export const uploadApi = {
  uploadFile: async (file: File, type: string) => {
    const formData = new FormData();
    formData.append(type, file);

    const { data } = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.data;
  },

  uploadVisitorDocuments: async (visitorId: string, files: Record<string, File>) => {
    const formData = new FormData();
    
    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file);
    });

    const { data } = await axios.post(`/visitor/${visitorId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.data;
  },
};