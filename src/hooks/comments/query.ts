import { IFormatOptionQuery } from '@/utils/getPagiantion.util';
import { uesGetInfinities } from '../common/uesGetInfinities';
import { useMutationCreate } from '../common/useCreate';
import { useMutationDelete } from '../common/useDelete';
import { QUERY_KEY, FEATURE } from '../constants';
import { IBaseUseMutation } from '../interfaces';
import {
  Comment,
  CreateComment,
  CreateSubComment,
  ResponseCreateComment,
} from './interface';

export const uesGetInfiComments = (params: IFormatOptionQuery) =>
  uesGetInfinities<Comment>({
    defineQueryKey: QUERY_KEY.PAGINATION_COMMENTS,
    query,
    configApi: {
      feature: FEATURE.COMMENT,
      isPublic: true,
    },
  });

export const useDeleteComment = () =>
  useMutationDelete({
    resource: FEATURE.COMMENT,
    defineQueryKey: QUERY_KEY.PAGINATION_COMMENTS,
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
    resource: RESOURCE.COMMENT,
    defineQueryKey: QUERY_KEY.PAGINATION_COMMENTS,
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
    resource: RESOURCE.COMMENT,
    defineQueryKey: QUERY_KEY.PAGINATION_COMMENTS,
  });
