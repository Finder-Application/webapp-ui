import { axiosClient } from '@/apis';
import { useQuery } from 'react-query';
import { User } from '../auth/interface';

export const useGetInfoUser = (id?: number, enabled: boolean = true) => {
  return useQuery(['useGetInfoUser', id], {
    queryFn: (): Promise<User> =>
      axiosClient.get(`/api/public/users/info/${id}`),
    staleTime: 5 * 60 * 60,
    enabled: !!id && enabled,
  });
};
