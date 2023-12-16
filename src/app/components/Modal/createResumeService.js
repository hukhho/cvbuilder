// createResumeService.js
import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../utils/axiosInstance';

const createResumeService = async resumeData => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.post(`/user/${userId}/cv`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createResumeService;
