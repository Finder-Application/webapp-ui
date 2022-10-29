import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import produce from 'immer';
import { RESOURCE } from '../constants';
import { IBaseUseMutationUpdate } from '../interfaces';

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
  const baseUrl = `/api/private/${resource}`;
  return axiosClient.delete(baseUrl, {
    params: itemId,
    data: dataUpdate,
  });
};

export const useMutationUpdate = <TUpdate, TResponse>(
  option: IBaseUseMutationUpdate<TUpdate, TResponse>
) => {
  const { configApi, configQuery, defineQueryKey } = option;

  const { resource, itemId, dataUpdate } = configApi;

  return useMutation(
    () => updateItem<TUpdate, TResponse>(resource, itemId, dataUpdate),
    {
      ...configQuery,
      onSuccess(data, variables, context) {
        // pls don't care it , thanks
        if (defineQueryKey) {
          const previousValueDelete = queryClient.getQueryData([
            defineQueryKey,
          ]);
          console.log('previousValueDelete');
          // queryClient.setQueryData([defineQueryKey], (old) => [...old, newTodo]);
        }
        //

        toast.success('Update Success!');
      },
      onError: (error) => {
        console.log(error);
        toast.error('Opp update error!');
      },
    }
  );
};
