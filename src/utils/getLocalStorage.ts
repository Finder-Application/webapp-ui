import { StorageKey } from '@/configs';

export const getLocalStorage = (key: StorageKey): string => {
  return localStorage.getItem(key) || '';
};
