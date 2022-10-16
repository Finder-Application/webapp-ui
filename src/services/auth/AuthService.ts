import { axiosClient } from '@/apis';
import { RqLoginDto } from './AuthDto';

class AuthService {
  private static readonly baseURL = '/auth/public';
  static async login(data: RqLoginDto) {
    return axiosClient.post(this.baseURL + '/login', data);
  }
}

export default AuthService;
