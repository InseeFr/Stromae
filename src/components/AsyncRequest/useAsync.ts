import { useCallback, useState, useRef } from 'react';

export enum AsyncRequestStatus {
	Idle,
	Pending,
	Success,
	Error,
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
		AsyncRequestStatus.Idle
	);

	const execute = useCallback(async () => {
		if (done.current || !request) {
			return;
		}
		done.current = true;
		setStatus(AsyncRequestStatus.Pending);
		setValue(null);
		try {
			setValue(await request());
			setStatus(AsyncRequestStatus.Success);
		} catch (e: any) {
			setError(e);
			setStatus(AsyncRequestStatus.Error);
		}
	}, [request, done]);

	return { value, error, status, execute };
}
