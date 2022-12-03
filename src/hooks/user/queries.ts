import { axiosClient } from '@/apis';
import { useMutation, useQuery } from 'react-query';
import { User } from '../auth/interface';
import { IBaseUseMutation } from '../interfaces';
import { useMutationUpdate } from '../common/useUpdate';
import { toast } from 'react-toastify';
import { FEATURE } from '../constants';

export interface UpdateUserInformationBody {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  isActive?: boolean;
  gender?: boolean;
  avatar?: string;
  social?: string;
  phone?: string;
  address?: string;
  email?: string;
}

export const useGetInfoUser = (id?: number, enabled: boolean = true) => {
  return useQuery(['useGetInfoUser', id], {
    queryFn: (): Promise<User> =>
      axiosClient.get(`/api/public/users/info/${id}`),
    staleTime: 5 * 60 * 60,
    enabled: !!id && enabled,
  });
};

export const useUpdateUserInformation = () => {
  const mutation = useMutation(
    ['UPDATE_USER'],
    (params: { body: UpdateUserInformationBody }) => {
      return axiosClient.put('api/private/users', params.body);
    }
  );
  return mutation;
};
