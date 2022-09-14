import { useState } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState(false);
  return [auth] as const;
};
