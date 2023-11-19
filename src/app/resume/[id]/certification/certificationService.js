// certificationsService.js
import axiosInstance from '../../../utils/axiosInstance';

export const getAllCertifications = async cvId => {
  try {
    const response = await axiosInstance.get(`/cv/${cvId}/certifications`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCertification = async (cvId, educationId) => {
  try {
    const response = await axiosInstance.delete(`/cv/${cvId}/certifications/${educationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCertification = async (cvId, educationData) => {
  try {
    const response = await axiosInstance.post(`/cv/${cvId}/certifications`, educationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCertification = async (cvId, educationId, educationData) => {
  try {
    const response = await axiosInstance.put(
      `/cv/${cvId}/certifications/${educationId}`,
      educationData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
