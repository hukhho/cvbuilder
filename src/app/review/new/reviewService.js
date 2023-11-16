// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';

const createReview = async (cvId, expertId, data) => {
  try {
    const response = await axiosInstance.post(
      `/cv/${cvId}/expert/${expertId}/request-review`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getResumes = async userId => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/cvs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getExperts = async userId => {
  try {
    const response = await axiosInstance.get('/experts');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getExperts, getResumes, createReview };
