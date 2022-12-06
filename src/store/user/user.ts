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
  gender: false,
};
export const useUserStore = create<UserStoreInterface>((set, get, api) => ({
  user: initUser,
  isLoggedIn: true,
  setUser: (value: Me) => {
    const previousUser = get().user;
    set({
      user: {
        ...previousUser,
        ...value,
      },
      isLoggedIn: true,
    });
  },
  resetUser: () => {
    set({
      user: initUser,
      isLoggedIn: false,
    });
  },
}));
