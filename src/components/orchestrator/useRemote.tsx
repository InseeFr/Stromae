import { useRef, useEffect, useState } from 'react';

const controller = new AbortController();

function abortRequest() {
	controller.abort();
}

/**
 * A hook to prevent dual fetch by using useRef.
 * @param cally
 * @returns
 */
export function useRemote<T>(
	cally: (() => Promise<T | undefined>) | undefined
): T | undefined {
	const [result, setResult] = useState<T | undefined>(undefined);
	const alreadyDone = useRef(false);

	useEffect(
		function () {
			if (!alreadyDone.current) {
				if (typeof cally === 'function') {
					alreadyDone.current = true;
					(async function () {
						setResult(await cally());
					})();
				}
			}
			return () => {
				abortRequest();
			};
		},
		[cally]
	);

	return result;
}
