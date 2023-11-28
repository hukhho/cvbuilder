import axiosInstance from '../../../utils/axiosInstance';

const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};

const getCoverLetter = async coverLetterId => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(
      `/chat-gpt/user/${userId}/cover-letter/${coverLetterId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getCoverLetter; // Export as default
