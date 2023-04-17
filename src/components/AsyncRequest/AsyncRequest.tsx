import { useEffect } from 'react';
import { Alert, AlertProps } from '@codegouvfr/react-dsfr/Alert';

import { useAsync, AsyncRequestStatus } from './useAsync';

type AsyncRequestProps<T> = {
	request?: () => Promise<T>;
	abort?: () => void;
	onSuccess: (result: T) => void;
	label?: {
		idle?: string;
		pending?: string;
		error?: string;
		success?: string;
	};
};

function nothing() {}

function getAlert(severity: AlertProps.Severity, message?: string) {
	if (message) {
		return <Alert closable severity={severity} description={message} small />;
	}
	return null;
}

export function AsyncRequest<T>(props: AsyncRequestProps<T>) {
	const { request, label = {}, onSuccess, abort = nothing } = props;
	const { idle, pending, error: errorLabel, success } = label;
	const { status, execute, error, value } = useAsync(request);

	useEffect(
		() => {
			execute();
			return () => {
				abort();
			};
		},
		[execute, abort]
	);

	useEffect(
		() => {
			if (error) {
				// eslint-disable-next-line no-console
				console.warn(error);
			}
		},
		[error]
	);

	useEffect(
		() => {
			if (value) {
				onSuccess(value);
			}
		},
		[value, onSuccess]
	);

	switch (status) {
		case AsyncRequestStatus.Idle:
			return getAlert('info', idle);
		case AsyncRequestStatus.Pending:
			return getAlert('info', pending);
		case AsyncRequestStatus.Error:
			return getAlert('warning', errorLabel);
		case AsyncRequestStatus.Success:
			return getAlert('success', success);
		default:
			return null;
	}
}
