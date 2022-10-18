import { FaceApiService } from '@/services/faceApi';
import { useMutation } from 'react-query';

export const useFaceApi = () => {
  const mutation = useMutation((files: File[]) =>
    FaceApiService.detectImages(files)
  );
  return mutation;
};
