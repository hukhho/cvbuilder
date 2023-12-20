// finishUpService.js
import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../../utils/axiosInstance';
import { mockData } from './mockData';

export const getFinishUp = async cvId => {
  try {
    const response = await axiosInstance.get(`/user/cv/${cvId}/finish-up`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAts = async cvId => {
  try {
    const response = await axiosInstance.get(`/users/cv/${cvId}/job-description/ats`);
    return response.data;
    // return {
    //   title: 'Associate Product Manager',
    //   description:
    //     'Gather, analyze and create high-level requirements\nParticipate in the product prototyping process, interface mock-up, wireframe, and GUI creation in an Agile environment\nAnalyze market trends and perform competitor analysis\nShare the business value to the development team, so they understand the intent behind the new feature, release, or product\nWork with the assigned Product Managers to define the product roadmap and vision\nPrioritize features by ranking them against the strategic goals and initiatives to make sure the delivery of the product, including managing dependencies in and across releases to complete release phases and milestones\nCoordinating all of the activities required to bring the product to market. This involves bridging gaps between different functions within the company and aligning all of the teams involved (e.g: Marketing, Sales & Sucess, Customer Support, others)\nDetermine which ideas should be promoted into features to push the product strategy forward\nEnsure that feedback and requests are seamlessly integrated into the product planning and development processes\nAt least 1 year of experience in Product Owner, IT Business Analyst, Product Executive or similar roles\nPossess Agile and Scrum practices\nGood presentation and stakeholder management\nAdvanced English and aptitude for learning and understanding new and emerging technologies\nBe familiar with requirement specification techniques: user story, modeling, prototyping.\nPossess great knowledge about requirement elicitation/management\nGood organizational, analytical, as well as oral, and written communication skills',
    //   ats: [
    //     {
    //       ats: 'Product Owner',
    //       status: 'Pass',
    //     },
    //     {
    //       ats: 'Product Manager',
    //       status: 'Pass',
    //     },
    //     {
    //       ats: 'Analyze',
    //       status: 'Pass',
    //     },
    //     {
    //       ats: 'High-level requirements',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Product prototyping',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Agile environment',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Market trends',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Competitor analysis',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Business value',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Product roadmap',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Vision',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Prioritize features',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Strategic goals',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Dependencies',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Product strategy',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Requirement specification techniques',
    //       status: 'Warning',
    //     },
    //   ],
    // };
    // return mockData.data.resume;
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
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}/histories`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAudit = async cvId => {
  try {
    const userId = getUserIdFromLocalStorage();

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
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.put(`/user/${userId}/cv/${cvId}/cv-body`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
