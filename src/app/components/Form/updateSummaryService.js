import axiosInstance from '../../utils/axiosInstance';

const updateSummary = async (cvId, summaryData) => {
  try {
    const userId =
      typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith('userId'))
            .split('=')[1]
        : null;

    if (!userId) {
      throw new Error('User ID not found.');
    }
    const response = await axiosInstance.put(`/user/${userId}/cv/${cvId}/summary`, summaryData);
    console.log('update: ', summaryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateSummary; // Export as default
