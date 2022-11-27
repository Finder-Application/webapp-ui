import { axiosClient } from '@/apis';
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
    configMutation,
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
    configMutation,
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
