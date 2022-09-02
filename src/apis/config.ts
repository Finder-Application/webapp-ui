import axios, { AxiosError } from 'axios';
import queryString from 'query-string';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data.data || response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      toast.error('Not found api');
    }

    throw error;
  }
);

export default axiosClient;
