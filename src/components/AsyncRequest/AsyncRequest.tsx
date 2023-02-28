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

function noRefCheck() {}

function getAlert(severity: AlertProps.Severity, message?: string) {
	if (message) {
		return (
			<Alert
				closable
				onClose={noRefCheck}
				severity={severity}
				description={message}
				small
			/>
		);
	}
	return null;
}

export function AsyncRequest<T>(props: AsyncRequestProps<T>) {
	const { request, label = {}, onSuccess, abort } = props;
	const { idle, pending, error: errorLabel, success } = label;
	const { status, execute, error, value } = useAsync(request);

	useEffect(
		function () {
			execute();
			return () => {
				if (abort) {
					abort();
				}
			};
		},
		[execute, abort]
	);

	useEffect(
		function () {
			if (error) {
				console.warn(error);
			}
		},
		[error]
	);

	useEffect(
		function () {
			if (value) {
				onSuccess(value);
			}
		},
		[value, onSuccess]
	);

	switch (status) {
		case AsyncRequestStatus.idle:
			return getAlert('info', idle);
		case AsyncRequestStatus.pending:
			return getAlert('info', pending);
		case AsyncRequestStatus.error:
			return getAlert('warning', errorLabel);
		case AsyncRequestStatus.success:
			return getAlert('success', success);
		default:
			return null;
	}
}
