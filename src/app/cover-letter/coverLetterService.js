import axiosInstance from '../../../utils/axiosInstance';

const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};

const deleteCoverLetter = async coverLetterId => {
  try {
    const userId = getUserIdFromCookie();
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
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.put(
      `chat-gpt/user/${userId}/cover-letter/${coverLetterId}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { deleteCoverLetter, updateCoverLetter }; // Export as default
