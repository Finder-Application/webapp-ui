import { axiosClient } from '@/apis';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {
  ChangePwDto,
  LoginDto,
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
  const { data, isLoading, isFetching } = useQuery(
    'GET_ME',
    () => axiosClient.get(baseURL(false, 'users/me')) as Promise<Me>,
    {
      // enabled: false,
      staleTime: Infinity,
    }
  );

  return { data, isLoading };
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
