import { useState } from 'react';

export const useGetMe = () => {
  const [auth, setAuth] = useState(false);
  return [auth, setAuth] as const;
};
