// finishUpService.js
import axiosInstance from '../../../utils/axiosInstance';

const getFinishUp = async cvId => {
  try {
    const response = await axiosInstance.get(`/user/finishUp/${cvId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default getFinishUp;
