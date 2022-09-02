import { AxiosRequestHeaders } from 'axios';
import { Method } from './api';

export interface Config {
  api: {
    userUrl: string;
  };
}

export type ConfigApi = Config['api'];
export type ApiVersion = keyof Config['api'];

export interface RequestOptions {
  apiVersion: ApiVersion;
  headers?: AxiosRequestHeaders;
  widthHeader?: boolean;
}
export interface JsonBody {
  [key: string]: any;
}

export interface RequestPayload {
  body?: JsonBody | FormData;
  params?: Object;
  method?: Method;
}
