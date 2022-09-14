import { AxiosRequestHeaders } from 'axios';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

interface Config {
  api: {
    userUrl: string;
  };
}

type ConfigApi = Config['api'];
type ApiVersion = keyof Config['api'];

interface RequestOptions {
  apiVersion: ApiVersion;
  headers?: AxiosRequestHeaders;
  widthHeader?: boolean;
}
interface JsonBody {
  [key: string]: any;
}

interface RequestPayload {
  body?: JsonBody | FormData;
  params?: Object;
  method?: Method;
}
