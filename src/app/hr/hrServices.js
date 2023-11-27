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
const updateHrPublic = async (postingId, data) => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.put(`/hr/${userId}/job-posting/${postingId}`, data);
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

const getCandidateList = async () => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get('/candidates/publish/information');
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

const getHrConfig = async () => {
  try {
    const userId = getUserIdFromCookie();
    // const response = await axiosInstance.get(`/expert/${userId}/information/config`);
    // return response.data;
    return {
      id: 0,
      name: 'This is Mock',
      subscription: true,
      companyName: 'Mock',
      companyLocation: 'string',
      companyLogo: 'string',
      companyDescription: 'string',
      price: {
        list: [
          { deadline: '1', price: '200' },
          { deadline: '2', price: '300' },
        ],
      },
    };
  } catch (error) {
    throw error;
  }
};

const updateHrConfig = async (cvId, data) => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstanceAuth.put(
      `/hrUpdate/${userId}/cv/${cvId}/information/config`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  postHrPublic,
  getHrPostList,
  postHrDraft,
  getHrConfig,
  updateHrConfig,
  getCandidateList,
  updateHrPublic,
};
