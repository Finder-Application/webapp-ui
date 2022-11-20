import { axiosClient } from '@/apis';
import { useUserStore } from '@/store/user';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {
  ChangePwDto,
  LoginDto,
  LoginGGDto,
  Me,
  RegisterDto,
  ResponseLogin,
} from './interface';

const baseURL = (isPublic: boolean, url: string) =>
  `api/${isPublic ? 'public' : 'private'}/${url}`;

export const useLogin = (
  option: UseMutationOptions<ResponseLogin, AxiosError, LoginDto>
) => {
  return useMutation(
    (payload: LoginDto) =>
      axiosClient.post(baseURL(true, 'auth/login'), {
        ...payload,
      }) as Promise<ResponseLogin>,
    {
      onError(error, variables, context) {
        toast.error('Your user name or password is invalid!');
      },
      ...option,
    }
  );
};

export const useSendOtp = (
  email: string,
  option: UseMutationOptions<unknown, AxiosError, unknown>
) =>
  useMutation(
    () => axiosClient.get(baseURL(true, `auth/forgot-pw?email=${email}`)),
    option
  );

export const useGetMe = () => {
  const { setUser, resetUser } = useUserStore((state) => state);
  return useQuery('GET_ME', {
    queryFn: (): Promise<Me> => axiosClient.get(baseURL(false, 'users/me')),
    onSuccess(data: Me) {
      setUser(data);
    },
    onError(data: Error) {
      resetUser();
    },
  });
};

export const useChangePwPublic = (
  option: UseMutationOptions<ResponseLogin, AxiosError, ChangePwDto>
) => {
  return useMutation(
    (payload: ChangePwDto) =>
      axiosClient.post(baseURL(true, 'auth/change-pw'), {
        ...payload,
      }) as Promise<ResponseLogin>,
    {
      onError() {
        toast.error('Something went wrong!');
      },
      ...option,
    }
  );
};

export const useRegisterMutation = (
  option: UseMutationOptions<ResponseLogin, AxiosError, RegisterDto>
) => {
  return useMutation(
    (payload: RegisterDto) =>
      axiosClient.post(baseURL(true, 'auth/register'), {
        ...payload,
      }) as Promise<ResponseLogin>,
    {
      onError() {
        toast.error('Something went wrong!');
      },
      ...option,
    }
  );
};

export const useRegisterGoogleMutation = (
  option: UseMutationOptions<ResponseLogin, AxiosError, LoginGGDto>
) => {
  return useMutation(
    (payload: LoginGGDto) =>
      axiosClient.post(baseURL(true, 'auth/login-gg'), {
        ...payload,
      }) as Promise<ResponseLogin>,
    {
      onError() {
        toast.error('Something went wrong!');
      },
      ...option,
    }
  );
};
