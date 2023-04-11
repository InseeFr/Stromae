import { useRef, useEffect } from 'react';

export function usePrevious<T>(value?: T) {
	const ref = useRef<T>();

	useEffect(
		function () {
			ref.current = value;
		},
		[value]
	);

	return ref.current;
}
