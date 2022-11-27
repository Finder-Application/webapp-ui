import { axiosClient } from '@/apis';
import { queryClient } from '@/main';
import { useQuery } from 'react-query';
import { useMutationCreate } from '../common/useCreate';
import { useMutationDelete } from '../common/useDelete';
import { useGetInfinities } from '../common/useGetInfinities';
import { FEATURE, QUERY_KEY } from '../constants';
import { IBaseUseMutation, IParamsDefault } from '../interfaces';
import {
  Comment,
  CreateComment,
  CreateSubComment,
  ResponseCreateComment,
} from './interface';

const baseURL = (isPublic: boolean, url: string) =>
  `api/${isPublic ? 'public' : 'private'}/${url}`;

export const uesGetInfiComments = (params: IParamsDefault<{}>) =>
  useGetInfinities<Comment>({
    query_key: QUERY_KEY.PAGINATION_COMMENTS,
    params,
    configApi: {
      feature: FEATURE.COMMENT,
      isPublic: true,
    },
  });

export const useDeleteComment = () =>
  useMutationDelete({
    configMutation: {
      onSuccess: (data, variables, context) => {
        data?.record?.postId && refetchCountComment(data?.record?.postId);
      },
    },
    resource: FEATURE.COMMENT,
    query_key: QUERY_KEY.PAGINATION_COMMENTS,
  });

export const useCreateComment = (
  configMutation?: IBaseUseMutation<
    ResponseCreateComment,
    unknown,
    {
      dataCreate: CreateComment;
    }
  >['configMutation']
) =>
  useMutationCreate<ResponseCreateComment, unknown, CreateComment>({
    configMutation: {
      ...configMutation,
      onSuccess: (data, variables, context) => {
        refetchCountComment(variables.dataCreate.postId);
      },
    },
    resource: FEATURE.COMMENT,
    query_key: QUERY_KEY.PAGINATION_COMMENTS,
  });

export const useCreateSubComment = (
  configMutation?: IBaseUseMutation<
    ResponseCreateComment,
    unknown,
    {
      dataCreate: CreateSubComment;
    }
  >['configMutation']
) =>
  useMutationCreate<ResponseCreateComment, unknown, CreateSubComment>({
    configMutation: {
      ...configMutation,
      onSuccess: (data, variables, context) => {
        refetchCountComment(variables.dataCreate.postId);
      },
    },
    resource: FEATURE.COMMENT,
    query_key: QUERY_KEY.PAGINATION_COMMENTS,
  });

export const useCountComment = (id: string | number | undefined) =>
  useQuery(
    [QUERY_KEY.COUNT_COMMENT, id],
    () =>
      axiosClient.get(baseURL(true, `comments/count?id=${id}`)) as unknown as {
        total: number;
      },
    {
      enabled: !!id,
    }
  );

const refetchCountComment = async (id: string | number | undefined) => {
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.COUNT_COMMENT, id],
    queryFn: () =>
      axiosClient.get(baseURL(true, `comments/count?id=${id}`)) as unknown as {
        total: number;
      },
  });
};
