// combinedService.js
import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';

const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};
const getCookieToken = () => {
  // Assuming your authentication token is stored in a cookie named 'auth_token'
  const token = Cookies.get('token');

  // You can add additional checks or modifications here if needed

  return token || ''; // Return an empty string if the token is not found
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

const getProtectedResourceWithoutToken = async () => {
  try {
    const response = await axiosInstance.get('/api/messages/protected');
    return {
      data: response.data || null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
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

const getHistoryFinishUp = async historyId => {
  try {
    const response = await axiosInstance.get(`/user/cv/history/${historyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteResume = async cvId => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.delete(`/user/${userId}/cv/${cvId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const duplicateResume = async cvId => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.post(`/user/user/${userId}/cv/${cvId}/duplicate`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCoverLetters = async () => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(`/chat-gpt/user/${userId}/cv/cover-letters`);

    // const mockCoverLetter = [
    //   {
    //     id: 1,
    //     title: 'Cover Letter 1',
    //     description: 'This is a mock cover letter',
    //   },
    //   {
    //     id: 2,
    //     title: 'Cover Letter 2',
    //     description: 'This is a mock cover letter',
    //   },
    // ];

    return response.data;
    // return mockCoverLetter;
  } catch (error) {
    throw error;
  }
};

export {
  getResumes,
  getResume,
  getCoverLetters,
  deleteResume,
  duplicateResume,
  getCookieToken,
  getProtectedResourceWithoutToken,
  getHistoryFinishUp,
};
