// getContact.js
import axiosInstance from '../../../utils/axiosInstance';

const getContact = async cvId => {
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

  try {
    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}/contact`);
    console.log('getContact: ', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getContact;
