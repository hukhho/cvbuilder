// createResumeService.js
import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../utils/axiosInstance';

const updateJobDescription = async (cvId, resumeData) => {
  try {
    const response = await axiosInstance.put(`/users/cv/${cvId}/job-description/ats`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createJobDescription = async (cvId, resumeData) => {
  const userId = getUserIdFromLocalStorage();

  try {
    const response = await axiosInstance.post(`/users/cv/${cvId}/job-description`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { updateJobDescription, createJobDescription };
