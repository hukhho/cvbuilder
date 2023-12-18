import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../utils/axiosInstance';

const updateSummary = async (cvId, summaryData) => {
  try {
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.put(`/user/${userId}/cv/${cvId}/summary`, summaryData);
    console.log('update: ', summaryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateSummary; // Export as default
