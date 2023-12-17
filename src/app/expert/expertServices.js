// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';
import { getUserIdFromLocalStorage } from '../utils/indexService';

// const postHrPublic = async data => {
//   try {
//     const userId = getUserIdFromCookie();
//     const response = await axiosInstance.post(`/hr/${userId}/job-posting/public`, data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

const getExpertPurchases = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`transaction/get-all/{user-id}?user-id=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getSuggestJobTitleAndCompany = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`user/${userId}/job-title/company/config`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getRequestList = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(
      `/cv/expert/${userId}/review-requests?sortBy=price&sortOrder=asc`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getExpertConfig = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/expert/${userId}/information/config`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateExpertConfig = async data => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(`/expert/${userId}/cv/information/config`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const rejectRequest = async requestId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(
      `/cv/expert/${userId}/review-request/${requestId}/reject`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const acceptRequest = async requestId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(
      `/cv/expert/${userId}/review-request/${requestId}/accept`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// const postHrDraft = async data => {
//   try {
//     const userId = getUserIdFromCookie();
//     const response = await axiosInstance.get(`/hr/${userId}/job-posting/draft`, data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
const getExpertPreview = async () => {
  try {
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.get(`/expert/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  getRequestList,
  acceptRequest,
  rejectRequest,
  getExpertConfig,
  getExpertPreview,
  updateExpertConfig,
  getExpertPurchases,
  getSuggestJobTitleAndCompany,
};
