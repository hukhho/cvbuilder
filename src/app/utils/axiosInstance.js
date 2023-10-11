// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-cvbuilder.monoinfinity.net/api/v1', // This is the base URL for your Next.js API routes
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// If you need to set up interceptors (e.g., for handling errors or setting auth headers), you can do it here.
// For example:
// instance.interceptors.request.use(config => {
//     const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

export default instance;
