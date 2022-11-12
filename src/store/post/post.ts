import { Descriptor } from '@/hooks/interfaces';
import { Post } from '@/hooks/post/interface';
import create from 'zustand';

export interface Address {
  // Region
  province?: string;
  // State
  district?: string;
}

export interface CreatePostFormData {
  hometownAddress?: Address;
  missingAddress?: Address;
  photos?: File[];
  descriptors?: Descriptor[];
}
interface PostStoreInterface {
  createPostFormData: CreatePostFormData;
  setCreatePostFormData: (data: CreatePostFormData) => void;
  isShowSharingPopup: boolean;
  setIsShowSharingPopup: (isShowSharingPopup: boolean) => void;
  selectedPost?: Post;
  setSelectedPost: (value: Post) => void;
}

export const usePostStore = create<PostStoreInterface>((set) => ({
  selectedPost: undefined,
  setSelectedPost: (value) => set({ selectedPost: value }),
  createPostFormData: {
    photos: [],
    descriptors: [],
  },
  setCreatePostFormData: (data) => {
    set((state) => ({
      createPostFormData: { ...state.createPostFormData, ...data },
    }));
  },

  isShowSharingPopup: false,
  setIsShowSharingPopup: (isShowSharingPopup: boolean) =>
    set({
      isShowSharingPopup,
    }),
}));
