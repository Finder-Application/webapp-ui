import { Me } from '@/hooks/auth/interface';
import create from 'zustand';

export enum RelevantResourcesMenuItems {
  RelevantPost = 'Relevant Posts',
  RelevantResources = 'Relevant Resources',
}

interface UserStoreInterface {
  user?: Me;
  setUser: (data: Me) => void;
}

export const useUserStore = create<UserStoreInterface>((set) => ({
  user: undefined,
  setUser: (value) => set({ user: value }),
}));
