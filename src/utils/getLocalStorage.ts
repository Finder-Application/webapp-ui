export const getLocalStorage = (key: string): string => {
  return localStorage.getItem(key) || '';
};
