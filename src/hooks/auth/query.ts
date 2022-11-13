import { axiosClient } from '@/apis';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { LoginDto, Me, ResponseLogin } from './interface';

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

export const useGetMe = () => {
  const { data, isLoading, isFetching } = useQuery(
    ['GET_ME'],
    () => axiosClient.get(baseURL(false, 'users/me')) as Promise<Me>,
    {
      // enabled: false,
      staleTime: Infinity,
    }
  );

  console.log('data', data);
  console.log('isLoading', isLoading);
  console.log('isFetching', isFetching);

  return { data, isLoading };
};
