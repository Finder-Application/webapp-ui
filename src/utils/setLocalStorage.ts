import { StorageKey } from '@/configs';

export const setLocalStorage = (key: StorageKey, value: string): void => {
  return localStorage.setItem(key, value);
};
