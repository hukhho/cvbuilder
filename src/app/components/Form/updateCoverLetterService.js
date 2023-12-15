import axiosInstance from '../../utils/axiosInstance';

const updateCoverLetter = async (cvId, coverLetterId, data) => {
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
