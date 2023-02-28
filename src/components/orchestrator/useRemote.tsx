import { useRef, useEffect, useState } from 'react';

function useRemote<T>(
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
				// TODO
			};
		},
		[cally]
	);

	return result;
}

export default useRemote;
