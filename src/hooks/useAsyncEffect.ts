/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import type { DependencyList } from 'react';

export const useAsyncEffect = (
	effect: () => Promise<unknown>,
	deps?: DependencyList
): void => {
	const effectCbRef = useRef(effect);
	effectCbRef.current = effect;
	useEffect(() => {
		effectCbRef.current();
	}, deps);
};
