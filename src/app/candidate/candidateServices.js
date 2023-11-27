// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';

const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};

const getCandidateConfig = async () => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(`/candidate/${userId}/information/config`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCandidateConfig = async data => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.put(`/candidate/${userId}/information/config`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getCandidateConfig, updateCandidateConfig };
