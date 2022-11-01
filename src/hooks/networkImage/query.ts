import { useMutation } from 'react-query';
import NetWorkImageService from './service';

export const useCreateNetworkImageUrl = () => {
  const mutation = useMutation((files: File[]) =>
    NetWorkImageService.getNetworkImageUrls(files)
  );
  return mutation;
};
