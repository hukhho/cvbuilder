// getContact.js
import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../../utils/axiosInstance';

const getContact = async cvId => {
  const userId = getUserIdFromLocalStorage();

  try {
    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}/contact`);
    console.log('getContact: ', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getContact;
