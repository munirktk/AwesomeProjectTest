import axios from 'axios';

const createApiInstance = (config) => {
  const instance = axios.create(config);

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );

  return instance;
};

export default createApiInstance;
