import axiosInstance from '../../../utils/axiosInstance';

const getContact = async userId => {
  try {
    const response = await axiosInstance.get(`/Users/userInfo/${userId}`);
    console.log('getContact: ', getContact);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getContact; // Export as default
