import { axiosClient } from '@/apis';
import { PostEntity } from '@/entites/Post';
// import { usePostStore2 } from '@/store/post';
import { useQuery, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useMutationCreate } from '../common/useCreate';
import { useGetInfinities } from '../common/useGetInfinities';
import { useMutationUpdate } from '../common/useUpdate';
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
    configMutation: {
      ...configMutation,
      onSuccess(data, variables, context) {
        toast.success('Create post successfully');
      },
    },
    resource: FEATURE.POST,
  });

export const useUpdatePost = (
  configMutation?: IBaseUseMutation<
    Post,
    unknown,
    {
      id: string;
      dataUpdate: CreatePostBody;
    }
  >['configMutation']
) =>
  useMutationUpdate<CreatePostBody, Post>({
    configMutation: {
      ...configMutation,
      onSuccess(data, variables, context) {
        toast.success('Updated post successfully');
      },
    },
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

export const useGetPostDetail = (id?: number) => {
  return useQuery(
    ['GET_POST_DETAIL', id],

    {
      enabled: !!id && id !== -1,
      queryFn: (): Promise<Post> => axiosClient.get(`/api/public/posts/${id}`),
    }
  );
};

export const useDeletePost = () =>
  useMutation(['DELETE_POST'], async (params: { id: number }) => {
    const data = await axiosClient.delete(`/api/private/posts/${params.id}`);
    return data;
  });
