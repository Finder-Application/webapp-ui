import { constants } from '@/configs';
import { getLocalStorage } from '@/utils';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from './config';
import { devUrl, productionUrl } from './urls';
import cloneDeep from 'lodash/cloneDeep';
import { ApiVersion, RequestOptions, RequestPayload } from '@/@types';
const isDev = process.env.NODE_ENV !== 'production';

export const getUrl = (apiVersion: ApiVersion) => {
  return isDev ? devUrl[apiVersion] : productionUrl[apiVersion];
};

export const makeRequest = async (
  config: RequestOptions,
  url: string,
  payload: RequestPayload
): Promise<AxiosResponse<any, any>> => {
  const { apiVersion, headers } = config;
  const { body, params, method } = payload;
  const apiUrl = getUrl(apiVersion);
  const token = getLocalStorage(constants.TOKEN_KEY);
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
class API {
  async get<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    const clonePayload = cloneDeep(payload);
    return makeRequest(config, url, { method: 'GET', ...clonePayload }) as T;
  }
  async post<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    const clonePayload = cloneDeep(payload);

    return makeRequest(config, url, { ...clonePayload, method: 'GET' }) as T;
  }
  async put<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    const clonePayload = cloneDeep(payload);

    return makeRequest(config, url, { ...clonePayload, method: 'GET' }) as T;
  }
  async delete<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    const clonePayload = cloneDeep(payload);

    return makeRequest(config, url, { ...clonePayload, method: 'GET' }) as T;
  }
  async patch<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    const clonePayload = cloneDeep(payload);
    return makeRequest(config, url, { ...clonePayload, method: 'GET' }) as T;
  }
}

export default new API();
