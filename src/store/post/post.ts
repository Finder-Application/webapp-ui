import create from 'zustand';

interface Address {
  province?: string;
  district?: string;
}
interface CreatePostFormData {
  hometownAddress?: Address;
  missingAddress?: Address;
}
interface PostStoreInterface {
  createPostFormData?: CreatePostFormData;
  setCreatePostFormData: (data: CreatePostFormData) => void;
  isShowSharingPopup: boolean;
  setIsShowSharingPopup: (isShowSharingPopup: boolean) => void;
}

export const usePostStore = create<PostStoreInterface>((set) => ({
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
