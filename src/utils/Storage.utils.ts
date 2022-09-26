import { StorageKey } from '@/configs';

class StorageUtils {
  static get(key: StorageKey): string {
    return localStorage.getItem(key) || '';
  }
  static remove(key: StorageKey) {
    const data = localStorage.getItem(key);
    localStorage.removeItem(key);
    return data;
  }
  static set(key: StorageKey, value: string) {
    localStorage.setItem(key, value);
    return value;
  }
}

export default StorageUtils;
