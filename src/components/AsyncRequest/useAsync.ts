import { useCallback, useState, useRef } from 'react';

export enum AsyncRequestStatus {
	idle,
	pending,
	success,
	error,
}

type AsyncRequest<T, E> = {
	value?: T | null;
	error?: E | null;
	status: AsyncRequestStatus;
	execute: () => void;
};

export function useAsync<T, E = any>(
	request?: () => Promise<T>
): AsyncRequest<T, E> {
	const done = useRef(false);
	const [value, setValue] = useState<T | null>();
	const [error, setError] = useState<E | null>();
	const [status, setStatus] = useState<AsyncRequestStatus>(
		AsyncRequestStatus.idle
	);

	const execute = useCallback(
		function () {
			if (!done.current && request) {
				done.current = true;
				setStatus(AsyncRequestStatus.pending);
				setValue(null);
				(async function () {
					try {
						setValue(await request());
						setStatus(AsyncRequestStatus.success);
					} catch (e: any) {
						setError(e);
						setStatus(AsyncRequestStatus.error);
					}
				})();
			}
		},
		[request, done]
	);

	return { value, error, status, execute };
}
