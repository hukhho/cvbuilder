// finishUpService.js
import axiosInstance from '../../../utils/axiosInstance';
import { mockData } from './mockData';

export const getFinishUp = async cvId => {
  try {
    const response = await axiosInstance.get('/user/1/cv/5/history/60');
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAts = async cvId => {
  try {
    const response = await axiosInstance.get(`/users/cv/${cvId}/job-description/ats`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getReview = async cvId => {
  try {
    const response = await axiosInstance.post(`/chat-gpt/cv/${cvId}/review?temperature=0.5`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getVersionsList = async cvId => {
  try {
    const userId =
      typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith('userId'))
            .split('=')[1]
        : null;

    if (!userId) {
      throw new Error('User ID not found.');
    }

    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}/histories`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAudit = async cvId => {
  try {
    const userId =
      typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith('userId'))
            .split('=')[1]
        : null;

    if (!userId) {
      throw new Error('User ID not found.');
    }

    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}/evaluate`);
    // return mockData.data.resume;
    return response.data;
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

export const saveCv = async (cvId, resumeData) => {
  try {
    const userId =
      typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith('userId'))
            .split('=')[1]
        : null;

    if (!userId) {
      throw new Error('User ID not found.');
    }

    const response = await axiosInstance.put(`/user/${userId}/cv/${cvId}/cv-body`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
