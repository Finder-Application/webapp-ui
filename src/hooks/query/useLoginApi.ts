import AuthService from '@/services/auth/AuthService';
import { useMutation } from 'react-query';
import { RqLoginDto } from './../../services/auth/AuthDto';

export const useLoginApi = () => {
  return useMutation((request: RqLoginDto) => AuthService.login(request));
};
