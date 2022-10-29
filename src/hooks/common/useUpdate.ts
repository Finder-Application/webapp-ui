import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { FEATURE } from '../constants';
import { IBaseUseMutationUpdate } from '../interfaces';

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
  const baseUrl = `/api/private/${resource}`;
  return axiosClient.put(baseUrl, {
    params: itemId,
    data: dataUpdate,
  });
};

export const useMutationUpdate = <TUpdate, TResponse>(
  option: IBaseUseMutationUpdate<TUpdate, TResponse>
) => {
  const { configApi, configQuery, query_key } = option;

  const { resource, id, data } = configApi;

  return useMutation(() => updateItem<TUpdate, TResponse>(resource, id, data), {
    ...configQuery,
    onSuccess(data, variables, context) {
      // pls don't care it , thanks
      if (query_key) {
        const previousValueDelete = queryClient.getQueryData([query_key]);
        console.log('previousValueDelete');
        // queryClient.setQueryData([defineQUERY_KEY], (old) => [...old, newTodo]);
      }
      //

      toast.success('Update Success!');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Opp update error!');
    },
  });
};
