// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';
import { getUserIdFromLocalStorage } from '../utils/indexService';

const getWithdrawRequests = async () => {
  try {
    const response = await axiosInstance.get('/transaction/view-withdraw-request');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// transaction/approve-withdraw-request/1
const approveWithdrawRequest = async transactionId => {
  try {
    const response = await axiosInstance.post(
      `/transaction/approve-withdraw-request/${transactionId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const saveImage = async (transactionId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(
      `transaction/${transactionId}/admin/withdraw/image`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getChartsMoney = async data => {
  try {
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.post(
      `admin/admin/${userId}/dashboard/chart?chart=Money`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getChartsUser = async data => {
  try {
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.post(
      `admin/admin/${userId}/dashboard/chart?chart=User`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getUsers = async () => {
  try {
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.get(`admin/${userId}/manage/user/information`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPostingJobs = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/admin/${userId}/job-postings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSub = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get('/admin/information/config');
    return response.data;
  } catch (error) {
    throw error;
  }
};
const checkApiKey = async () => {
  try {
    const response = await axiosInstance.post('/admin/config/api-key/check');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getEvaluatesConfig = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(`/admin/${userId}/evaluates/config`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const saveScore = async (evaluateId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(
      `/admin/${userId}/evaluate/${evaluateId}/score-criteria`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const saveSub = async data => {
  try {
    const response = await axiosInstance.put('/admin/information/config', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const banJob = async jobId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(`/admin/${userId}/job-posting/${jobId}/ban`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const unbanJob = async jobId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(`/admin/${userId}/job-posting/${jobId}/un-ban`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const banUser = async customerId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(`admin/${userId}/manage/user/${customerId}/ban`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const unbanUser = async customerId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(`admin/${userId}/manage/user/${customerId}/un-ban`);
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

export {
  getWithdrawRequests,
  getUsers,
  getPostingJobs,
  banJob,
  unbanJob,
  getEvaluatesConfig,
  saveScore,
  getSub,
  saveSub,
  banUser,
  unbanUser,
  checkApiKey,
  getChartsMoney,
  getChartsUser,
  saveImage,
  approveWithdrawRequest,
};
