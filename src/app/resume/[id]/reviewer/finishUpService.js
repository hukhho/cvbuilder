// finishUpService.js
import axiosInstance from '../../../utils/axiosInstance';
import { mockData } from './mockData';

const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};

export const getFinishUp = async cvId => {
  try {
    // const response = await axiosInstance.get(`/user/cv/${cvId}/finish-up`);
    return mockData.data.resume;
    // return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewResponse = async requestId => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(
      `/cv/expert/${userId}/review-request/${requestId}/review-response`,
    );
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReviewResponse = async (responseId, data) => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.put(
      `/cv/expert/${userId}/review-response/${responseId}/overall`,
      data,
    );
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAudit = async cvId => {
  try {
    // const response = await axiosInstance.get(`/user/1/cv/${cvId}/evaluate`);
    return mockData.data.resume;
    // return response.data;
  } catch (error) {
    throw error;
  }
};

export const syncUp = async cvId => {
  try {
    const response = await axiosInstance.get(`/cv/synchUp/${cvId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
