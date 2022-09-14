import { StorageKey } from '@/configs';

export const removeLocalStorage = (key: StorageKey): string | null => {
  const data = localStorage.getItem(key);
  localStorage.removeItem(key);
  return data;
};
