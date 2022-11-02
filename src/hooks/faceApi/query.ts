import { useMutation } from 'react-query';
import { FaceApiService } from './service';

export const useFaceApi = () => {
  const mutation = useMutation((files: File[]) =>
    FaceApiService.detectImages(files)
  );
  return mutation;
};
