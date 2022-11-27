import create from 'zustand';

interface AppStoreState {
  isShowingLoadingModal: boolean;
  setIsShowingLoadingModal: (value: boolean) => void;
  globalSearchingKeyWords: string;
  setGlobalSearchingKeywords: (value: string) => void;
}
export const useAppStore = create<AppStoreState>((set) => ({
  globalSearchingKeyWords: '',
  setGlobalSearchingKeywords: (keywords) => {
    set({ globalSearchingKeyWords: keywords });
  },

  isShowingLoadingModal: false,
  setIsShowingLoadingModal: (isShowingLoadingModal: boolean) =>
    set({
      isShowingLoadingModal,
    }),
}));
