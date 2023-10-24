import axiosInstance from '../../utils/axiosInstance';

const updateCoverLetter = async (userId, coverLetterId, data) => {
  try {
    const response = await axiosInstance.put(
      `/chat-gpt/${userId}/cover-letter/${coverLetterId}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateCoverLetter;
