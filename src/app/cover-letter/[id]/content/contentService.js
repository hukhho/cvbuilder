import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../../utils/axiosInstance';

const getContent = async coverLetterId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(
      `chat-gpt/user/${userId}/cover-letter/${coverLetterId}`,
    );
    return response.data;
    // return {
    //   id: 1,
    //   cvId: 2,
    //   title: 'string',
    //   dear: 'string',
    //   date: '2023-11-22',
    //   company: 'string',
    //   description:
    //     'Hi Dear Hiring Manager,\n\nI am writing to express my interest in the job opportunity for the position of [Job Title] at [Company]. I came across the job description and was immediately captivated by the potential for growth and the exciting challenges mentioned. Based on my background and experiences, I believe I am a strong candidate for this role.\n\nIn reviewing the job description, I noticed that you are looking for someone who possesses a strong background in [relevant skill/experience].',
    //   user: {
    //     name: 'string',
    //     address: 'string',
    //     phone: 'string',
    //     email: 'string',
    //   },
    // };
  } catch (error) {
    throw error;
  }
};

export default getContent; // Export as default
