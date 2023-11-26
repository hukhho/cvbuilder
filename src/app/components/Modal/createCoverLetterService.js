// createResumeService.js
import axiosInstance from '../../utils/axiosInstance';

const createCoverLetterService = async (cvId, resumeData) => {
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

  try {
    const response = await axiosInstance.post(
      `/chat-gpt/user/${userId}/cv/${cvId}/cover-letter`,
      resumeData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createCoverLetterService;
