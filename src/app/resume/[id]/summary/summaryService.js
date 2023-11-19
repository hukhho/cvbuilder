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
    console.log('getSummary: ', getSummary);
    return response.data;
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
    const queryString = convertContactDataToQueryString(values);

    const response = await axiosInstance.post(`/chat-gpt/cv/${cvId}/summary?${queryString}`);

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

export { getSummary, postSummaryAi };
