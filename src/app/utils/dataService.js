// dataService.js
import axiosInstance from './axiosInstance';

class DataService {
  constructor(dataType, cvId) {
    this.dataType = dataType;
    this.cvId = cvId;
  }

  async getAll() {
    try {
      //  /cv/{cvId}/education

      const response = await axiosInstance.get(`/cv/${this.cvId}/${this.dataType}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sortOrder(data) {
    try {
      //  /cv/{cvId}/education

      const response = await axiosInstance.put(
        `/cv/${this.cvId}/${this.dataType}/update-all`,
        data,
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const response = await axiosInstance.post(`/cv/${this.cvId}/${this.dataType}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(dataId, data) {
    try {
      //    cv/{cvId}/education/{educationId}/
      console.log('Update dataId: ', dataId);

      const response = await axiosInstance.put(`/cv/${this.cvId}/${this.dataType}/${dataId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(dataId) {
    try {
      console.log('Delete dataId: ', dataId);
      const response = await axiosInstance.delete(`/cv/${this.cvId}/${this.dataType}/${dataId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default DataService;
