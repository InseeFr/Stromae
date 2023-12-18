import { useEffect, useRef, useState } from 'react';
import { responseData } from './LoadSourceData';

const controller = new AbortController();

function abortRequest() {
	controller.abort();
}

function nothing() {}

/**
 * A hook to prevent dual fetch by using useRef.
 * @param cally
 * @returns
 */
export function useRemote<T>(
	cally: (() => Promise<T | undefined>) | undefined,
	onfail: (data?: responseData) => void = nothing
): T | undefined {
	const [result, setResult] = useState<T | undefined>(undefined);
	const alreadyDone = useRef(false);

	useEffect(() => {
		if (!alreadyDone.current) {
			if (typeof cally === 'function') {
				alreadyDone.current = true;
				(async function () {
					try {
						setResult(await cally());
					} catch (e: any) {
						const data = e?.response?.data;
						onfail(data);
					}
				})();
			}
		}
		return () => {
			abortRequest();
		};
	}, [cally, onfail, result]);

	return result;
}
