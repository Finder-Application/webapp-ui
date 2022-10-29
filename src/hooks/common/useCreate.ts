import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { FEATURE } from '../constants';
import { IBaseUseMutationCreate } from '../interfaces';

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
    data: dataCreate,
  });
};

export const useMutationCreate = <TCreate, TResponse>(
  option: IBaseUseMutationCreate<TCreate, TResponse>
) => {
  const { configApi, configQuery, query_key } = option;

  const { feature: resource, data: dataCreate } = configApi;

  return useMutation(
    () => createItem<TCreate, TResponse>(resource, dataCreate),
    {
      ...configQuery,
      onSuccess(data, variables, context) {
        // pls don't care it , thanks
        if (query_key) {
          const previousValueDelete = queryClient.getQueryData([query_key]);
          console.log('previousValueDelete');
          // queryClient.setQueryData([defineQUERY_KEY], (old) => [...old, newTodo]);
        }
        //

        toast.success('Create Success!');
      },
      onError: (error) => {
        console.log(error);
        toast.error('Opp create error!');
      },
    }
  );
};
