// educationService.js
import axiosInstance from '../../../utils/axiosInstance';

export const getAllEducations = async cvId => {
  try {
    const response = await axiosInstance.get(`/cv/${cvId}/educations`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEducation = async (cvId, educationId) => {
  try {
    const response = await axiosInstance.delete(`/cv/${cvId}/educations/${educationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEducation = async (cvId, educationData) => {
  try {
    const response = await axiosInstance.post(`/cv/${cvId}/educations`, educationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEducation = async (cvId, educationId, educationData) => {
  try {
    const response = await axiosInstance.put(
      `/cv/${cvId}/educations/${educationId}`,
      educationData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
