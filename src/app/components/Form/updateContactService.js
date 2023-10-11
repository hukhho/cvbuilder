import axiosInstance from '../../utils/axiosInstance';

const updateContact = async (userId, contactData) => {
  try {
    const response = await axiosInstance.put(`/user/${userId}/contact`, contactData);
    console.log('update: ', getContact);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateContact; // Export as default
