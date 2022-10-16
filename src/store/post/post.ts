import create from 'zustand';

interface PostStoreInterface {
  isShowSharingPopup: boolean;
  setIsShowSharingPopup: (isShowSharingPopup: boolean) => void;
}
export const usePostStore = create<PostStoreInterface>((set) => ({
  isShowSharingPopup: false,
  setIsShowSharingPopup: (isShowSharingPopup: boolean) =>
    set({
      isShowSharingPopup,
    }),
}));
