import { useQuery } from 'react-query';
import PostService from './post.service';

const useCreatePost = () => {
  return useQuery([], PostService.create);
};
