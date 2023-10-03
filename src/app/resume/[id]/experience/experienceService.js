// experienceService.js
import axiosInstance from '../../../utils/axiosInstance';

export const getAllExperiences = async cvId => {
  try {
    const response = await axiosInstance.get(`/cv/${cvId}/experiences`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExperience = async (cvId, experienceId) => {
  try {
    const response = await axiosInstance.delete(`/cv/${cvId}/experiences/${experienceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createExperience = async (cvId, experienceData) => {
  try {
    const response = await axiosInstance.post(`/cv/${cvId}/experiences`, experienceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExperience = async (cvId, experienceId, experienceData) => {
  try {
    const response = await axiosInstance.put(
      `/cv/${cvId}/experiences/${experienceId}`,
      experienceData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
