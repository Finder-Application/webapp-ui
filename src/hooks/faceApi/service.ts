import { axiosClient } from '@/apis';
import FileUtils from '@/utils/File.utils';
import { Descriptor } from '../post/interface';

interface FaceDetectionResponse {
  data: Descriptor[];
}

export class FaceApiService {
  private static readonly baseURL: string = '/face-api';

  static async detectImages(files: File[]) {
    const requestData = new FormData();
    files.forEach(async (file) => {
      requestData.append('files', file);
    });
    const response: FaceDetectionResponse = await axiosClient.post(
      this.baseURL + '/detect',
      requestData
    );

    return response.data;
  }
}
