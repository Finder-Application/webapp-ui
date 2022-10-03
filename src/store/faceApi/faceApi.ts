import create from 'zustand';

interface FaceAPIModel {
  isLoaded: boolean;
  setLoadedModels: (params: boolean) => void;
}
export const useLoadedModelStore = create<FaceAPIModel>((set) => ({
  isLoaded: false,
  setLoadedModels: (isLoaded: boolean) =>
    set({
      isLoaded,
    }),
}));
