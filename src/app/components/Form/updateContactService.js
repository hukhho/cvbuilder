// updateContact.js
import axiosInstance from '../../utils/axiosInstance';

const updateContact = async (cvId, contactData) => {
  try {
    // Move the userId retrieval to the client side
    const userId = getUserIdFromCookie();

    const response = await axiosInstance.put(`/user/${userId}/cv/${cvId}/contact`, contactData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get userId from cookie, which can be executed on the client side
const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};

export default updateContact;
