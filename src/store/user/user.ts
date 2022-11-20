import { Me } from '@/hooks/auth/interface';
import create from 'zustand';

export enum RelevantResourcesMenuItems {
  RelevantPost = 'Relevant Posts',
  RelevantResources = 'Relevant Resources',
}

interface UserStoreInterface {
  user: Me;
  isLoggedIn: boolean;
  setUser: (data: Me) => void;
  resetUser: () => void;
}
const initUser = {
  address: '',
  avatar: '',
  email: '',
  firstName: '',
  isActive: 0,
  userId: -1,
  lastName: '',
  middleName: '',
  phone: '',
  uuid: '',
};
export const useUserStore = create<UserStoreInterface>((set, get, api) => ({
  user: initUser,
  isLoggedIn: false,
  setUser: (value: Me) => {
    if (get().user.userId == -1) {
      set({
        user: value,
        isLoggedIn: true,
      });
    }
  },
  resetUser: () => {
    set({
      user: initUser,
      isLoggedIn: false,
    });
  },
}));
