import { axiosClient } from '@/apis';
import { RqLoginDto } from './AuthDto';

class AuthService {
  private static readonly baseURL = '/auth';
  static async login(data: RqLoginDto) {
    return axiosClient.post(this.baseURL, data);
  }
}

export default AuthService;
