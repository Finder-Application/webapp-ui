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

const updateItem = <TUpdate, TResponse>(
  resource: FEATURE,
  itemId: string,
  dataUpdate: TUpdate
): Promise<TResponse> => {
  const baseUrl = `/api/private/${resource}/${itemId}`;
  return axiosClient.put(baseUrl, {
    ...dataUpdate,
  });
};

export const useMutationUpdate = <TUpdate, TResponse>(
  option: IBaseUseMutation<
    TResponse,
    unknown,
    {
      id: string;
      dataUpdate: TUpdate;
    }
  >
) => {
  const { resource, configMutation, query_key: defineQueryKey } = option;

  return useMutation(
    ({ id, dataUpdate }) =>
      updateItem<TUpdate, TResponse>(resource, id, dataUpdate),
    {
      ...configMutation,
      onSuccess(data, variables, context) {
        if (defineQueryKey) {
          queryClient.refetchQueries([defineQueryKey]);
        }
        toast.success('Update Success!');
      },
      onError: (error) => {
        console.log(error);
        toast.error('Opp update error!');
      },
    }
  );
};
