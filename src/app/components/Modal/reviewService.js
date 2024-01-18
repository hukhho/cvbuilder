// combinedService.js
import axiosInstance from '@/app/utils/axiosInstance';
import { getUserIdFromLocalStorage } from '@/app/utils/indexService';

const createReview = async (cvId, expertId, data) => {
  try {
    const response = await axiosInstance.post(
      `/cv/${cvId}/expert/${expertId}/request-review`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const applyJob = async (jobId, cvId, coverletterId, note) => {
  try {
    const userId = getUserIdFromLocalStorage();
    let apiUrl = `/user/${userId}/cv/${cvId}/job-posting/${jobId}/apply`;

    // Append note and coverletterId to the API URL if they are provided
    if (note) {
      apiUrl += `?note=${note}`;
      if (coverletterId) {
        apiUrl += `&cover_letter_id=${coverletterId}`;
      }
    } else if (coverletterId) {
      apiUrl += `?cover_letter_id=${coverletterId}`;
    }

    const response = await axiosInstance.post(apiUrl);
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
  applyJob,
};
