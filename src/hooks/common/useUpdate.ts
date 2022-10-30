import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import produce from 'immer';
import { RESOURCE } from '../constants';
import { IBaseUseMutation } from '../interfaces';

export interface ResponseDeleteSuccess {
  message: string;
  record: {
    id: string | number;
  };
}

const updateItem = <TUpdate, TResponse>(
  resource: RESOURCE,
  itemId: string,
  dataUpdate: TUpdate
): Promise<TResponse> => {
  const baseUrl = `/api/private/${resource}/${itemId}`;
  return axiosClient.delete(baseUrl, {
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
  const { resource, configMutation, defineQueryKey } = option;

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
