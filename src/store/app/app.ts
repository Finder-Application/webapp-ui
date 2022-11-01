import create from 'zustand';

interface AppStoreState {
  isShowingLoadingModal: boolean;
  setIsShowingLoadingModal: (value: boolean) => void;
}
export const useAppStore = create<AppStoreState>((set) => ({
  isShowingLoadingModal: false,
  setIsShowingLoadingModal: (isShowingLoadingModal: boolean) =>
    set({
      isShowingLoadingModal,
    }),
}));
