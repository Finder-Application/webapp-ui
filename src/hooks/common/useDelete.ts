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

const deleteItem = (
  resource: FEATURE,
  itemId: number
): Promise<ResponseDeleteSuccess> => {
  const baseUrl = `/api/private/${resource}/${itemId}`;
  return axiosClient.delete(baseUrl);
};

interface TVariables {
  id: number;
}

export const useMutationDelete = (
  option: IBaseUseMutation<ResponseDeleteSuccess, unknown, TVariables>
) => {
  const {
    resource,
    configMutation,
    query_key: defineQueryKey,
    showToast,
  } = option;

  return useMutation(({ id }) => deleteItem(resource, id), {
    ...configMutation,
    onSuccess(data, variables, context) {
      if (defineQueryKey) {
        queryClient.refetchQueries([defineQueryKey]);
      }
      showToast && toast.success('Delete Success!');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Opp delete error!');
    },
  });
};
