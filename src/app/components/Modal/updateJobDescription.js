// createResumeService.js
import axiosInstance from '../../utils/axiosInstance';

const updateJobDescription = async (cvId, resumeData) => {
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
    const response = await axiosInstance.put(`/users/cv/${cvId}/job-description/ats`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createJobDescription = async (cvId, resumeData) => {
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
    const response = await axiosInstance.post(`/users/cv/${cvId}/job-description`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { updateJobDescription, createJobDescription };
