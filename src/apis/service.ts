import { ApiVersion, RequestOptions, RequestPayload } from '@/@types';
import cloneDeep from 'lodash/cloneDeep';
import { makeRequest } from './config';
import { devUrl, productionUrl } from './urls';
const isDev = process.env.NODE_ENV !== 'production';

export const getUrl = (apiVersion: ApiVersion): string => {
  return isDev ? devUrl[apiVersion] : productionUrl[apiVersion];
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
