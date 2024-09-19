// src/api/axios.ts
import axios from 'axios';

// Create an instance of Axios with the base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from Vite environment variables
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add more default configurations here if needed
});

// Optionally, add interceptors to handle request/response
apiClient.interceptors.request.use(
  (config) => {
    // Modify config before request is sent (e.g., attach authorization token)
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle response errors (e.g., handle token expiration, log errors)
    return Promise.reject(error);
  }
);

export default apiClient;
