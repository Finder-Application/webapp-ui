import { axiosClient } from '@/apis';
import { ITemplateQuery } from './template.interface';

export class TemplateService {
  private static baseURL: string = '/api/public/';
  static getAll<T, U>(
    urlTemplate: string,
    params: ITemplateQuery<T>
  ): Promise<U> {
    const { filter, order } = params;
    // TODO: I THINK WE SHOULD USING METHOD GET -> POST
    return axiosClient.get(this.baseURL + urlTemplate, {
      params: {
        ...params,
        filter: JSON.stringify(filter),
        order: JSON.stringify(order),
      },
    });
  }
}
