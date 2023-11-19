// combinedService.js
import axiosInstance from './axiosInstance';

const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};

const getResumes = async () => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(`/user/${userId}/cvs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getResume = async cvId => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCoverLetters = async () => {
  try {
    // const response = await axiosInstance.get(`/user/${userId}/coverletters`);

    const mockCoverLetter = [
      {
        id: 1,
        title: 'Cover Letter 1',
        description: 'This is a mock cover letter',
      },
      {
        id: 2,
        title: 'Cover Letter 2',
        description: 'This is a mock cover letter',
      },
    ];

    // return response.data;
    return mockCoverLetter;
  } catch (error) {
    throw error;
  }
};

export { getResumes, getResume, getCoverLetters };
