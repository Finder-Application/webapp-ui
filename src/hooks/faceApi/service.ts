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
        requestData.set('files', fileResized);
      })
    );
    const response = await axiosClient.post<FaceDetectionResponse>(
      this.baseURL + '/detect',
      requestData
    );

    return response;
  }
}
