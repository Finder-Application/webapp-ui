import { useMutationCreate } from '../common/useCreate';
import { RESOURCE } from '../constants';
import { IBaseUseMutation } from '../interfaces';
import { Address, CreatePostResponse, FaceDescriptor } from './interface';

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
    resource: RESOURCE.POST,
  });
