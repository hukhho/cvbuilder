import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../../utils/axiosInstance';

const getCoverLetter = async coverLetterId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(
      `/chat-gpt/user/${userId}/cover-letter/${coverLetterId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getCoverLetter; // Export as default
