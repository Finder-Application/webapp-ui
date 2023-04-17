import { axiosClient } from '@/apis';
import FileUtils from '@/utils/File.utils';
import { Descriptor } from '../post/interface';
import { constants } from '@/configs';
import axios from 'axios';

interface FaceDetectionResponse {
  data: Descriptor[];
}

export class FaceApiService {
  private static readonly baseURL: string = constants.BASE_URL_DETECT;

  static async detectImages(files: File[]) {
    const requestData = new FormData();
    files.forEach(async (file) => {
      requestData.append('files', file);
    });
    const response: FaceDetectionResponse = await axios.post(
      this.baseURL,
      requestData
    );

    return response.data;
  }
}
