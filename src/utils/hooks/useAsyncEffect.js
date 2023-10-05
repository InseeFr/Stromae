/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

export const useAsyncEffect = (effect, deps) => {
  const effectCbRef = useRef(effect);
  effectCbRef.current = effect;
  useEffect(() => {
    effectCbRef.current();
  }, deps);
};
