// finishUpService.js
import axiosInstance from '../../../utils/axiosInstance';
import { mockData } from './mockData';

export const getFinishUp = async cvId => {
  try {
    // const response = await axiosInstance.get(`/user/finishUp/${cvId}`);
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
