import axios from 'axios';
import { baseURL } from './env';
import { refreshToken } from './auth';

const isTokenExpired = (token) => {
  const { expiry } = token;
  return Date.now() >= expiry;
};
// Define the base configuration for the Axios instance 
const defaultConfig = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Create the Axios instance with configurable overrides
const createApiInstance = (configOverrides = {}) => {
  const config = {
    ...defaultConfig,
    ...configOverrides,
    headers: {
      ...defaultConfig.headers,
      ...configOverrides.headers
    }
  };

  const instance = axios.create(config);

  // Request interceptor to handle token insertion and FormData Content-Type
  instance.interceptors.request.use(
    config => {
      const token = ''
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      // If the data is FormData, let Axios set the Content-Type header to handle boundaries
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }

      console.log("interceptors.request", config);
      return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor for automatic token refresh and error handling
  instance.interceptors.response.use(
    response => {
      console.log('response.data:', response);
      return response;
    },
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry && isTokenExpired()) {
        originalRequest._retry = true; // Mark this request as retried 
        try {
            const newToken = await refreshToken(); // Attempt to refresh the token
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`; // Update the request's header
            return axiosInstance(originalRequest); // Retry the original request with the new token
        } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            return Promise.reject(refreshError); // If token refresh fails, pass the error along
        }
    }
      console.error('API Error:', error.response);
      return Promise.reject(error);
    }
  );

  return instance;
};

const api = createApiInstance();

export default api;
