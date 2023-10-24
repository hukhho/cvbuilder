// combinedService.js
import axiosInstance from './axiosInstance';

const getResumes = async userId => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/cvs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCoverLetters = async userId => {
  try {
    // const response = await axiosInstance.get(`/user/${userId}/coverletters`);

    const mockCoverLetter = [
      {
        id: 1,
        title: 'Cover Letter 1',
        description: 'This is a mock cover letter',
        userId: 1,
      },
      {
        id: 2,
        title: 'Cover Letter 2',
        description: 'This is a mock cover letter',
        userId: 1,
      },
    ];

    // return response.data;
    return mockCoverLetter;
  } catch (error) {
    throw error;
  }
};

export { getResumes, getCoverLetters };
