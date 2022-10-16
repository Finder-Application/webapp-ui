import { axiosClient } from '@/apis';

class FaceApiService {
  private readonly baseURL: string = '/face-api';

  async isPerson(base64: string[]) {
    axiosClient.post(this.baseURL + '/detect', {
      files: [...base64],
    });
  }
}

export default new FaceApiService();
