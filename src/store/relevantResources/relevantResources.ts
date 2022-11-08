import create from 'zustand';

export enum RelevantResourcesMenuItems {
  RelevantPost = 'Relevant Posts',
  RelevantResources = 'Relevant Resources',
}

interface RelevantResourcesInterface {
  currentPage: RelevantResourcesMenuItems;
  setCurrentPage: (data: RelevantResourcesMenuItems) => void;
}

export const useRelevantResourcesStore = create<RelevantResourcesInterface>(
  (set) => ({
    currentPage: RelevantResourcesMenuItems.RelevantPost,
    setCurrentPage: (value) => set({ currentPage: value }),
  })
);
