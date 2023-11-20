// skillservice.js
import axiosInstance from '../../../utils/axiosInstance';

export const getAllskills = async cvId => {
  try {
    const response = await axiosInstance.get(`/cv/${cvId}/skills`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSkills = async (cvId, SkillsId) => {
  try {
    const response = await axiosInstance.delete(`/cv/${cvId}/skills/${skillId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSkills = async (cvId, skillData) => {
  try {
    const response = await axiosInstance.post(`/cv/${cvId}/skills`, skillData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSkills = async (cvId, skillId, skillData) => {
  try {
    const response = await axiosInstance.put(`/cv/${cvId}/skills/${skillId}`, skillData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
