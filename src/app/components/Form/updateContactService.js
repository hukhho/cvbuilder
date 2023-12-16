// updateContact.js
import axiosInstance from '../../utils/axiosInstance';

const updateContact = async (cvId, contactData) => {
  try {
    // Move the userId retrieval to the client side
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.put(`/user/${userId}/cv/${cvId}/contact`, contactData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateContact;
