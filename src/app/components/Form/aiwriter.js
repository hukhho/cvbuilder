/* eslint-disable no-restricted-syntax */
import axiosInstance from '../../utils/axiosInstance';

const fakeData = {
  data: { reply: ['content 1', 'content 2', 'content 3'] },
};

export const createAIWriter = async data => {
  try {
    const queryString = convertContactDataToQueryString(data);

    const response = await axiosInstance.post('/chat-gpt/cv/experience/re-writer', data);
    return response.data;
    // return {
    //   reply:
    //     'Hi Dear Hiring Manager,\n\nI am writing to express my interest in the job opportunity for the position of [Job Title] at [Company]. I came across the job description and was immediately captivated by the potential for growth and the exciting challenges mentioned. Based on my background and experiences, I believe I am a strong candidate for this role.\n\nIn reviewing the job description, I noticed that you are looking for someone who possesses a strong background in [relevant skill/experience].',
    // };

    // const response = await axiosInstance.post(
    //   'https://api-cvbuilder.monoinfinity.net/api/v1/chat-gpt/generate?temperature=0.2&company=1&title=1&cvId=1&dear=1&name=1&description=1',
    //   {
    //     timeout: 20000,
    //   },
    // );

    // return response.data;
  } catch (error) {
    throw error;
  }
};
const convertContactDataToQueryString = contactData => {
  const queryStringParams = [];

  for (const [key, value] of Object.entries(contactData)) {
    queryStringParams.push(`${key}=${encodeURIComponent(value)}`);
  }

  return queryStringParams.join('&');
};
