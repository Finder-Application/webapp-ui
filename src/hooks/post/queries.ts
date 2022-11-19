import { axiosClient } from '@/apis';
import { PostEntity } from '@/entites/Post';
import { useQuery } from 'react-query';
import { useMutationCreate } from '../common/useCreate';
import { useGetInfinities } from '../common/useGetInfinities';
import { QUERY_KEY, FEATURE } from '../constants';
import { IBaseUseMutation, IParamsDefault } from '../interfaces';
import { Address, CreatePostResponse, FaceDescriptor, Post } from './interface';

export interface CreatePostBody {
  title: string;
  fullName: string;
  nickname: string;
  dateOfBirth: Date;
  gender: boolean;
  missingAddress: Address;
  hometown: Address;
  missingTime: Date;
  photos: string[];
  description: string;
  descriptors: FaceDescriptor[];
}

export const useCreatePost = (
  configMutation?: IBaseUseMutation<
    CreatePostResponse,
    unknown,
    {
      dataCreate: CreatePostBody;
    }
  >['configMutation']
) =>
  useMutationCreate<CreatePostResponse, unknown, CreatePostBody>({
    configMutation,
    resource: FEATURE.POST,
  });

export const useGetPosts = (params: IParamsDefault<PostEntity>) =>
  useGetInfinities<Post, PostEntity>({
    query_key: QUERY_KEY.PAGINATION_POSTS,
    params,
    configApi: {
      feature: FEATURE.POST,
      isPublic: true,
    },
  });

export const useGetPostDetail = (params: { id: number }) =>
  useQuery(['GET_POST_DETAIL', params.id], async () => {
    const data: Post = await axiosClient.get(`/api/public/posts/${params.id}`);
    return data;
  });
