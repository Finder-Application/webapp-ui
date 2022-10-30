import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { RESOURCE } from '../constants';
import { IBaseUseMutation } from '../interfaces';

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
  return axiosClient.delete(baseUrl + '/' + itemId);
};

interface TVariables {
  id: string;
}

export const useMutationDelete = (
  option: IBaseUseMutation<ResponseDeleteSuccess, unknown, TVariables>
) => {
  const { resource, configMutation, defineQueryKey } = option;

  return useMutation(({ id }) => deleteItem(resource, id), {
    ...configMutation,
    onSuccess(data, variables, context) {
      if (defineQueryKey) {
        queryClient.refetchQueries([defineQueryKey]);
      }
      toast.success('Delete Success!');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Opp delete error!');
    },
  });
};
