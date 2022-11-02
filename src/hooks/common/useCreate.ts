import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { FEATURE } from '../constants';
import { IBaseUseMutation } from '../interfaces';

export interface ResponseDeleteSuccess {
  message: string;
  record: {
    id: string | number;
  };
}

const createItem = <TCreate, TResponse>(
  resource: FEATURE,
  dataCreate: TCreate
): Promise<TResponse> => {
  const baseUrl = `/api/private/${resource}`;
  return axiosClient.post(baseUrl, {
    ...dataCreate,
  });
};

export const useMutationCreate = <TResponse, TError, TCreate>(
  option: IBaseUseMutation<
    TResponse,
    TError,
    {
      dataCreate: TCreate;
    }
  >
) => {
  const { resource, configMutation, defineQueryKey } = option;

  return useMutation(
    ({ dataCreate }) => createItem<TCreate, TResponse>(resource, dataCreate),
    {
      ...configMutation,
      onSuccess(data, variables, context) {
        if (defineQueryKey) {
          queryClient.refetchQueries([defineQueryKey]);
        }

        toast.success('Create Success!');
      },
      onError: (error) => {
        console.log(error);
        toast.error('Opp create error!');
      },
    }
  );
};
