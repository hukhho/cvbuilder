/* eslint-disable */

import axiosInstance from '../../../utils/axiosInstance';

const getSummary = async cvId => {
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
    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const getSummaryHistory = async cvId => {
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
    // const response = await axiosInstance.get(`/user/cv/${cvId}/summary/history-summaries`);
    const minNumber = 1;
    const maxNumber = 100;
    const randomInt1 = getRandomInt(minNumber, maxNumber);
    const randomInt2 = getRandomInt(minNumber, maxNumber);

    const simmulator = [
      { id: 1, version: `This is content ${randomInt1}` },
      { id: 2, version: `This is content ${randomInt2}` },
    ];
    return simmulator;
    // return response.data;
  } catch (error) {
    throw error;
  }
};

const postSummaryAi = async (cvId, values) => {
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

    const response = await axiosInstance.post(`/chat-gpt/cv/${cvId}/summary`, values);

    return response.data;
  } catch (error) {
    throw error;
  }
};
const convertContactDataToQueryString = data => {
  const queryStringParams = [];

  for (const [key, value] of Object.entries(data)) {
    queryStringParams.push(`${key}=${encodeURIComponent(value)}`);
  }

  return queryStringParams.join('&');
};

export { getSummary, postSummaryAi, getSummaryHistory };
