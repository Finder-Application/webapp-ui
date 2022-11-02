import { axiosClient } from '@/apis';
import { NetWorkImageServiceResponse } from './interface';

class NetWorkImageService {
  private static readonly baseURL = '/api/public/util/upload-multiple';
  static async getNetworkImageUrls(
    files: File[]
  ): Promise<NetWorkImageServiceResponse> {
    const requestData = new FormData();

    files.forEach((file) => requestData.set('files', file));
    return (await axiosClient.post(this.baseURL, requestData)).data;
  }
}

export default NetWorkImageService;
