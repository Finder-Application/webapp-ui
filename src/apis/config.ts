import { constants } from './../configs/constants';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import StorageUtils from '@/utils/Storage.utils';

const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
  baseURL: constants.BASE_URL,
});

axiosClient.interceptors.request.use((config): AxiosRequestConfig<any> => {
  const { data } = config;
  const token = StorageUtils.get('token');
  const contentType =
    data instanceof FormData ? 'multipart/form-data' : 'application/json';

  const defaultHeaders = {
    'content-type': contentType,
    authorization: `Bearer ${token}`,
  };

  return { ...config, headers: { ...config.headers, ...defaultHeaders } };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      const token = response.data.data?.token;
      if (token) {
        StorageUtils.set('token', token);
      }
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status == 401) {
      StorageUtils.remove('token');
    }
    throw error;
  }
);

export default axiosClient;
