// createResumeService.js
import axiosInstance from '../../utils/axiosInstance';

const createCoverLetterService = async (cvId, resumeData) => {
  const userId = getUserIdFromLocalStorage();

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
