import axios from 'axios';
import { Report } from '../types/Report';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5001/api';



export const uploadReport = async (file: File): Promise<{ reportId: string }> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${API_URL}/reports/upload`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        

        return response.data;
    } catch (error:any) {
        throw new Error(error?.message);
    }
  
};

export const getReport = async (): Promise<Report[]> => {
  const response = await axios.get(`${API_URL}/reports`);
  return response.data;
};