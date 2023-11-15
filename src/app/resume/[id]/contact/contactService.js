import axiosInstance from '../../../utils/axiosInstance';

const getContact = async (userId, cvId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}`);
    console.log('getContact: ', getContact);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getContact; // Export as default
