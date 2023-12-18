// createResumeService.js
import axiosInstance from '../../utils/axiosInstance';

const updateResumeService = async (cvId, resumeData) => {
  try {
    const response = await axiosInstance.put(`/user/${cvId}/target`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateResumeService;
