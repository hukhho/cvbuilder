import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../utils/axiosInstance';

const updateCoverLetter = async (cvId, coverLetterId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    console.log('updateCoverLetter: ', data);
    const response = await axiosInstance.put(
      `/chat-gpt/user/cv/${cvId}/cover-letter/${coverLetterId}/content`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateCoverLetter;
