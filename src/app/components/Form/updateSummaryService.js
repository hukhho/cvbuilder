import axiosInstance from '../../utils/axiosInstance';

const updateSummary = async (userId, cvId, summaryData) => {
  try {
    const response = await axiosInstance.put(`/user/${userId}/cv/${cvId}/summary`, summaryData);
    console.log('update: ', summaryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateSummary; // Export as default
