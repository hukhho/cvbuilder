import axiosInstance from '../../../utils/axiosInstance';

const getCoverLetter = async (userId, coverLetterId) => {
  try {
    const response = await axiosInstance.get(`/chat-gpt/${userId}/cover-letter/${coverLetterId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getCoverLetter; // Export as default
