import axios, { AxiosError } from 'axios';
import { apiBase } from './settings';

export const axiosInstance = axios.create({
  baseURL: apiBase,
  timeout: 1000,
});

export const setToken = (token: string) => {
  if (!token) {
    if (axiosInstance.defaults.headers.common.hasOwnProperty('Authorization')) {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
    return;
  }

  axiosInstance.defaults.headers.common['Authorization'] = token;
};

const buildErrorResponse = ({ message, code, config }: AxiosError) => ({
  errors: [
    {
      reason: message,
      domain: `${apiBase}${config.url ?? ''}`,
      code,
      message,
    },
  ],
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(buildErrorResponse(error));
  }
);
