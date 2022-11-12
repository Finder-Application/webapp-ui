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
    await Promise.all(
      files.map(async (file) => {
        const fileResized = await FileUtils.resizeFile(file);
        requestData.append('files', fileResized);
      })
    );
    const response: FaceDetectionResponse = await axiosClient.post(
      this.baseURL + '/detect',
      requestData
    );

    return response.data;
  }
}
