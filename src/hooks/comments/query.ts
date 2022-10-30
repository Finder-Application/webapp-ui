import { IFormatOptionQuery } from '@/utils/getPagiantion.util';
import { UseMutationOptions } from 'react-query';
import { uesGetInfinities } from '../common/uesGetInfinities';
import { useMutationCreate } from '../common/useCreate';
import { useMutationDelete } from '../common/useDelete';
import { QUERY_KEY, RESOURCE } from '../constants';
import { IBaseUseMutation } from '../interfaces';
import {
  Comment,
  CreateComment,
  CreateSubComment,
  ResponseCreateComment,
} from './interface';

export const uesGetInfiComments = (query: IFormatOptionQuery) =>
  uesGetInfinities<Comment>({
    defineQueryKey: QUERY_KEY.PAGINATION_COMMENTS,
    query,
    configApi: {
      resource: RESOURCE.COMMENT,
      isPublic: true,
    },
  });

export const useDeleteComment = () =>
  useMutationDelete({
    resource: RESOURCE.COMMENT,
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
