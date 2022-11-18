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
