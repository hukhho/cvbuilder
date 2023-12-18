import axiosInstance from '@/app/utils/axiosInstance';
import { getUserIdFromLocalStorage } from '../utils/indexService';

const deleteCoverLetter = async coverLetterId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.delete(
      `chat-gpt/user/${userId}/cover-letter/${coverLetterId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCoverLetter = async (coverLetterId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.delete(
      `chat-gpt/user/${userId}/cover-letter/${coverLetterId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCoverLetterName = async (coverLetterId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(
      `chat-gpt/user/cv/cover-letter/${coverLetterId}/title`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCoverLetterHistory = async coverLetterId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/user/cv/${coverLetterId}/history-cover-letter`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { deleteCoverLetter, updateCoverLetter, updateCoverLetterName, getCoverLetterHistory };
