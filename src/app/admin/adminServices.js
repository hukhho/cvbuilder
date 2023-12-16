// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';
import { getUserIdFromLocalStorage } from '../utils/indexService';

const getWithdrawRequests = async data => {
  try {
    const response = await axiosInstance.get('/transaction/view-withdraw-request');
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getUsers = async data => {
  try {
    const response = await axiosInstance.get('/user/manage/customer/information');
    return response.data;
  } catch (error) {
    throw error;
  }
};
//
const postHrPublic = async data => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.post(`/hr/${userId}/job-posting/public`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const updateHrPublic = async (postingId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(`/hr/${userId}/job-posting/${postingId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getJobPosting = async postingId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/hr/${userId}/job-posting/${postingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getHrPostList = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(
      `/hr/${userId}/job-postings?sortBy=view&sortOrder=asc`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCandidateApplication = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/application-log/candidate/${userId}`);
    return response.data;
    // return [
    //   {
    //     id: 1,
    //     status: 'Reviced',
    //     candidate: 'Pham Viet Thuan Thien',
    //     cvId: '1',
    //     coverLetterId: '1',
    //     timestamp: '2023-11-28',
    //     note: 'Lorem',
    //   },
    //   {
    //     id: 2,
    //     status: 'Reviced',
    //     candidate: 'Pham Viet Thuan Thien2',
    //     cvId: '2',
    //     coverLetterId: '2',
    //     timestamp: '2023-11-28',
    //     note: 'Lorem2',
    //   },
    // ];
  } catch (error) {
    throw error;
  }
};

const getHrApplication = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/application-log/hr/${userId}`);
    return response.data;
    // return [
    //   {
    //     id: 1,
    //     status: 'Reviced',
    //     candidate: 'Pham Viet Thuan Thien',
    //     cvId: '1',
    //     coverLetterId: '1',
    //     timestamp: '2023-11-28',
    //     note: 'Lorem',
    //   },
    //   {
    //     id: 2,
    //     status: 'Reviced',
    //     candidate: 'Pham Viet Thuan Thien2',
    //     cvId: '2',
    //     coverLetterId: '2',
    //     timestamp: '2023-11-28',
    //     note: 'Lorem2',
    //   },
    // ];
  } catch (error) {
    throw error;
  }
};

const getCandidateList = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get('/candidates/publish/information');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postHrDraft = async data => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/hr/${userId}/job-posting/draft`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getHrConfig = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/hr/${userId}/information/config`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateHrConfig = async (cvId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(`/hr/${userId}/information/config`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getWithdrawRequests, getUsers };
