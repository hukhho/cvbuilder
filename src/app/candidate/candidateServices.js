// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';

const getUserIdFromCookie = () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];

  return userId;
};

const getCandidateConfig = async () => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(`/candidate/${userId}/information/config`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getCandidatePurchases = async () => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.get(`transaction/get-all/{user-id}?user-id=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCandidateConfig = async data => {
  try {
    const userId = getUserIdFromCookie();
    const response = await axiosInstance.put(`/candidate/${userId}/information/config`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const depositMoney = async data => {
  try {
    const userId = getUserIdFromCookie();
    // Assuming userId is a string
    data.userId = parseInt(userId, 10); // The second argument (10) is the radix/base, use 10 for decimal
    const response = await axiosInstance.post('/transaction/input-credit', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const withdrawMoney = async data => {
  try {
    const userId = getUserIdFromCookie();
    // Assuming userId is a string
    data.userId = parseInt(userId, 10); // The second argument (10) is the radix/base, use 10 for decimal
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
};
