// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';

const createReview = async (cvId, expertId, optionId, data) => {
  try {
    const response = await axiosInstance.post(
      `/cv/${cvId}/expert/${expertId}/request-review/option/${optionId}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getResumes = async userId => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/cvs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getExperts = async () => {
  try {
    const response = await axiosInstance.get('/experts');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getReviewRequestsByCandiate = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(
      `/cv/candidate/${userId}/review-requests?sortBy=price&sortOrder=asc`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getExpert = async id => {
  try {
    const response = await axiosInstance.get(`/expert/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const searchExperts = async searchKeyword => {
  try {
    const response = await axiosInstance.get(`/experts?search=${searchKeyword}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  getExperts,
  getExpert,
  getResumes,
  createReview,
  searchExperts,
  getReviewRequestsByCandiate,
};
