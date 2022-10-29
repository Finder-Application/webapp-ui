import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { FEATURE } from '../constants';
import { IBaseUseMutationDelete } from '../interfaces';

export interface ResponseDeleteSuccess {
  message: string;
  record: {
    id: string | number;
  };
}

const deleteItem = (
  resource: FEATURE,
  id: string
): Promise<ResponseDeleteSuccess> => {
  const baseUrl = `/api/private/${resource}`;
  return axiosClient.delete(baseUrl, {
    params: {
      id,
    },
  });
};

export const useMutationDelete = (
  option: IBaseUseMutationDelete<ResponseDeleteSuccess>
) => {
  const { configApi, configQuery, query_key } = option;

  const { feature, id } = configApi;

  return useMutation(() => deleteItem(feature, id), {
    ...configQuery,
    onSuccess(data, variables, context) {
      // pls don't care it , thanks
      if (query_key) {
        const previousValueDelete = queryClient.getQueryData([query_key]);
        console.log('previousValueDelete');
        // queryClient.setQueryData([defineQUERY_KEY], (old) => [...old, newTodo]);
      }
      //
      toast.success('Delete Success!');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Opp delete error!');
    },
  });
};
