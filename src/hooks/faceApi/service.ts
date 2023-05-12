import { axiosClient } from '@/apis';
import FileUtils from '@/utils/File.utils';
import { Descriptor } from '../post/interface';
import { constants } from '@/configs';
import axios, { AxiosResponse } from 'axios';

interface FaceDetectionResponse {
  data: Descriptor[];
}

export class FaceApiService {
  private static readonly baseURL: string = constants.BASE_URL_DETECT;

  static async detectImages(files: File[]): Promise<Descriptor[]> {
    const requestData = new FormData();
    files.forEach(async (file) => {
      requestData.append('files', file);
    });
    const response: AxiosResponse<FaceDetectionResponse> = await axios.post(
      this.baseURL,
      requestData
    );

    return response.data.data;
  }
}
