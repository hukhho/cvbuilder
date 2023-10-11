import axiosInstance from '../../../utils/axiosInstance';

const getSummary = async (userId, cvId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}`);
    console.log('getSummary: ', getSummary);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getSummary;
