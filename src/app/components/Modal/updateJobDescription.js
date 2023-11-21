// createResumeService.js
import axiosInstance from '../../utils/axiosInstance';

const updateJobDescription = async (cvId, jobdescriptionId, resumeData) => {
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
      `/user/cv/${cvId}/job-description/${jobdescriptionId}`,
      resumeData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateJobDescription;
