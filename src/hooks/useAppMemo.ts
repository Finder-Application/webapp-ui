import _isEqual from 'lodash/isEqual';
import { DependencyList, useMemo } from 'react';
import useDeepMemorize from './useDeepMemorize';

const useAppMemo = <T>(factory: () => T, dependencies?: DependencyList) => {
  return useMemo(factory, useDeepMemorize(dependencies));
};

export default useAppMemo;
