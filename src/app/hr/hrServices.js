// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';

const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};

const postHrPublic = async data => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.post(`/hr/${userId}/job-posting/public`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getHrPostList = async () => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(
      `/hr/${userId}/job-postings?sortBy=view&sortOrder=asc`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const postHrDraft = async data => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(`/hr/${userId}/job-posting/draft`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { postHrPublic, getHrPostList, postHrDraft };
