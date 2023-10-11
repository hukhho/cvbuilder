import axiosInstance from '../../utils/axiosInstance';

const createResumeService = async (userId, resumeData) => {
  try {
    const response = await axiosInstance.post(`/user/${userId}/cv`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createResumeService; // Export as default
