// combinedService.js
import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';
import axiosInstancev1 from './axiosInstancev1';

const getUserIdFromLocalStorage = () => {
  const userId = localStorage.getItem('userId');
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
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/user/${userId}/cvs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getResumesCvs = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/user/${userId}/cvs/resume`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getJobLists = async () => {
  try {
    const response = await axiosInstance.get('/job-postings/generation/description');
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getBalance = async () => {
  try {
    const response = await axiosInstancev1.get('/messages/protected/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getResumesCoverLetter = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`user/${userId}/cv/detail/cover-letter`);
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
    const userId = getUserIdFromLocalStorage();
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
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.delete(`/user/${userId}/cv/${cvId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const duplicateResume = async cvId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.post(`/user/user/${userId}/cv/${cvId}/duplicate`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCoverLetters = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/chat-gpt/user/${userId}/cv/cover-letters`);

    return response.data;
    // return mockCoverLetter;
  } catch (error) {
    throw error;
  }
};
const getCoverLettersByCvId = async cvId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(
      `/chat-gpt/user/${userId}/cv/cover-letters?cvId=${cvId}`,
    );

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
  getCoverLettersByCvId,
  deleteResume,
  duplicateResume,
  getCookieToken,
  getProtectedResourceWithoutToken,
  getHistoryFinishUp,
  getUserIdFromLocalStorage,
  getResumesCoverLetter,
  getBalance,
  getResumesCvs,
  getJobLists,
};
