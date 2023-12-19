// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';
import { getUserIdFromLocalStorage } from '../utils/indexService';

const getCandidateConfig = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/candidate/${userId}/information/config`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCandidatePurchases = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`transaction/get-all/{user-id}?user-id=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCandidateConfig = async data => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(`/candidate/${userId}/information/config`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const depositMoney = async data => {
  try {
    const userId = getUserIdFromLocalStorage();
    // Assuming userId is a string
    data.userId = parseInt(userId, 10); // The second argument (10) is the radix/base, use 10 for decimal
    const response = await axiosInstance.post('/transaction/input-credit', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const queryPayment = async (orderId, requestId) => {
  try {
    const response = await axiosInstance.get(
      `/transaction/query-transaction?orderId=${orderId}&requestId=${requestId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const withdrawMoney = async data => {
  try {
    const userId = getUserIdFromLocalStorage();
    // Assuming userId is a string
    data.receiverId = parseInt(userId, 10); // The second argument (10) is the radix/base, use 10 for decimal
    const response = await axiosInstance.post('/transaction/withdraw', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  getCandidateConfig,
  updateCandidateConfig,
  depositMoney,
  getCandidatePurchases,
  withdrawMoney,
  queryPayment,
};
