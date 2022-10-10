import { FaceApiService } from '@/services/faceApi';
import { useMutation } from 'react-query';

export const useFaceApi = () => {
  const mutation = useMutation((base64: string[]) =>
    FaceApiService.isPerson(base64)
  );
  return mutation;
};
