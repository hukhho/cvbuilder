import axiosInstance from '../../utils/axiosInstance';

const updateCoverLetter = async (coverLetterId, data) => {
  try {
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
