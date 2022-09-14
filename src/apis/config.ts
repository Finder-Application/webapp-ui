import { RequestOptions, RequestPayload } from '@/@types';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { getUrl } from './service';

const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      const token = response.data.data?.token;
      if (token) {
        setLocalStorage('TOKEN', token);
      }
      return response.data.data || response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      toast.error('Not found api');
    }
    if (error.response?.status == 401) {
      removeLocalStorage('TOKEN');
    }
    throw error;
  }
);

const makeRequest = async (
  config: RequestOptions,
  url: string,
  payload: RequestPayload
): Promise<AxiosResponse<any, any>> => {
  const { apiVersion, headers } = config;
  const { body, params, method } = payload;
  const apiUrl = getUrl(apiVersion);
  const token = getLocalStorage('TOKEN');
  const contentType =
    body instanceof FormData ? 'multipart/form-data' : 'application/json';
  const defaultHeaders = {
    'content-type': contentType,
    authorization: `Bearer ${token}`,
  };

  const configApi: AxiosRequestConfig = {
    baseURL: apiUrl,
    params,
    headers: { ...defaultHeaders, ...headers },
    data: body,
    method,
  };
  return axiosClient(url, configApi);
};

export { makeRequest, axiosClient };
