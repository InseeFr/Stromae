import { useState, useRef } from 'react';
/**
 * See https://github.com/garronej/powerhooks#useconstcallback for details
 */
export function useConstCallback(callback) {
  const callbackRef = useRef();
  callbackRef.current = callback;
  return useState(
    () =>
      (...args) =>
        callbackRef.current(...args)
  )[0];
}
