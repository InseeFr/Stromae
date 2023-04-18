import { useCallback, useEffect, KeyboardEvent } from 'react';

export function useTabulate(first?: HTMLElement, last?: HTMLElement) {
	useEffect(
		() => {
			first?.focus();
		},
		[first]
	);

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLElement>) => {
			if (e.key === 'Tab') {
				if (e.shiftKey) {
					if (document.activeElement === first) {
						last?.focus();
						e.nativeEvent.preventDefault();
					}
				} else if (document.activeElement === last) {
						first?.focus();
						e.nativeEvent.preventDefault();
					}
			}
		},
		[first, last]
	);
	return { onKeyDown };
}
