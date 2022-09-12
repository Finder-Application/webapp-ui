import { useState } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState(true);
  return [auth] as const;
};
