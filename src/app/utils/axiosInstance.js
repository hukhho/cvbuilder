// axiosInstance.js
import useStore from '@/store/store';
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8080/api/v1', // This is the base URL for your Next.js API routes

  baseURL: 'https://api-cvbuilder.monoinfinity.net/api/v1', // This is the base URL for your Next.js API routes
  timeout: 60000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// If you need to set up interceptors (e.g., for handling errors or setting auth headers), you can do it here.
// For example:
// Add an interceptor to set the Authorization header
instance.interceptors.request.use(config => {
  // Only execute this code if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Get the accessToken from localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Set the Authorization header if the accessToken is available
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

// Add an interceptor to handle 401 errors
instance.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 errors
    if (error.response.status === 401) {
      // Log out the user and delete the accessToken from localStorage
      if (typeof window !== 'undefined') {
        // Clear localStorage when logging out
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('userRole');
        localStorage.removeItem('accessToken');

        console.log('logout');
        // Redirect to the login page or perform any other logout-related action
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);
export default instance;
