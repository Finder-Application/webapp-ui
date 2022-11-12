import { axiosClient } from '@/apis';
import { NetWorkImageServiceResponse } from './interface';

class NetWorkImageService {
  private static readonly baseURL = '/api/public/util/upload-multiple';
  static async getNetworkImageUrls(files: File[]) {
    const requestData = new FormData();
    files.forEach((file) => requestData.append('files', file));
    const response: NetWorkImageServiceResponse = await axiosClient.post(
      this.baseURL,
      requestData
    );

    return response;
  }
}

export default NetWorkImageService;
