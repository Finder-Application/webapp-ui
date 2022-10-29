import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { RESOURCE } from '../constants';
import { IBaseUseMutationDelete } from '../interfaces';

export interface ResponseDeleteSuccess {
  message: string;
  record: {
    id: string | number;
  };
}

const deleteItem = (
  resource: RESOURCE,
  itemId: string
): Promise<ResponseDeleteSuccess> => {
  const baseUrl = `/api/private/${resource}`;
  return axiosClient.delete(baseUrl, {
    params: itemId,
  });
};

export const useMutationDelete = (
  option: IBaseUseMutationDelete<ResponseDeleteSuccess>
) => {
  const { configApi, configQuery, defineQUERY_KEY } = option;

  const { resource, itemId } = configApi;

  return useMutation(() => deleteItem(resource, itemId), {
    ...configQuery,
    onSuccess(data, variables, context) {
      // pls don't care it , thanks
      if (defineQUERY_KEY) {
        const previousValueDelete = queryClient.getQueryData([defineQUERY_KEY]);
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
