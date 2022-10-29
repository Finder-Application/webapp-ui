import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { RESOURCE } from '../constants';
import { IBaseUseMutationCreate } from '../interfaces';

export interface ResponseDeleteSuccess {
  message: string;
  record: {
    id: string | number;
  };
}

const createItem = <TCreate, TResponse>(
  resource: RESOURCE,
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
  const { configApi, configQuery, defineQUERY_KEY } = option;

  const { resource, dataCreate } = configApi;

  return useMutation(
    () => createItem<TCreate, TResponse>(resource, dataCreate),
    {
      ...configQuery,
      onSuccess(data, variables, context) {
        // pls don't care it , thanks
        if (defineQUERY_KEY) {
          const previousValueDelete = queryClient.getQueryData([
            defineQUERY_KEY,
          ]);
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
