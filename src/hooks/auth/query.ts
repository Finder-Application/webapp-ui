import { useState } from 'react';

export const getMe = () => {
  const [auth, setAuth] = useState(false);
  return [auth, setAuth] as const;
};
