import { PostSchema } from '@/schemas/post.schema';
import { useMutation } from 'react-query';
import {
  ITemplateQuery,
  TemplateResponse,
} from '../template/template.interface';
import { TemplateService } from '../template/template.service';
import { PostData } from './post.interface';
export const useQueryPosts = () => {
  return useMutation((query: ITemplateQuery<PostSchema>) =>
    TemplateService.getAll<PostSchema, TemplateResponse<PostData>>(
      'posts',
      query
    )
  );
};
