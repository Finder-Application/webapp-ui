import { axiosClient } from '@/apis';
import FileUtils from '@/utils/File.utils';

class FaceApiService {
  private readonly baseURL: string = '/face-api';

  async detectImages(files: File[]) {
    const requestData = new FormData();
    await Promise.all(
      files.map(async (file) => {
        const fileResized = await FileUtils.resizeFile(file);
        requestData.set('files', fileResized);
      })
    );
    return axiosClient.post(this.baseURL + '/detect', requestData);
  }
}

export default new FaceApiService();
