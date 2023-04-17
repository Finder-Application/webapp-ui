import React, { useRef } from 'react';
import _isEqual from 'lodash/isEqual';

const useDeepMemorize = <T>(value: T): T => {
  const ref = useRef<T>(value);
  if (_isEqual(ref.current, value)) {
    return ref.current;
  }

  return value;
};

export default useDeepMemorize;
