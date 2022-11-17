import { axiosClient } from '@/apis';
import { useQuery } from 'react-query';
import { Post } from '../post/interface';

export const useRelevantPosts = (params: { id: number }) =>
  useQuery(['GET_RELEVANT_POSTS', params.id], async () => {
    const data: Post[] = await axiosClient.get(
      `/api/private/posts/relevant/${params.id}`
    );
    return data;
  });
