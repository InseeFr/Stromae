import { useCallback } from 'react';
import { useParams } from 'react-router';

import { useOidc } from '../../lib/oidc';
import { CloneElements } from '../orchestrator/CloneElements';

import { HeaderProps } from './Header';

type HeaderAuthProps = {
	children: JSX.Element;
};

function getCallBack(args: { survey?: string; unit?: string }) {
	const { survey, unit } = args;
	if (survey && unit) {
		return `${window.origin}/questionnaire/${survey}/unite-enquetee/${unit}`;
	}
	if (survey) {
		return `${window.origin}/questionnaire/${survey}`;
	}
	return `${window.origin}/404`;
}

export function HeaderAuth({ children }: HeaderAuthProps) {
	const { login, logout, isAuthenticated } = useOidc();
	const { survey, unit } = useParams();

	const handleOidcAuth = useCallback(() => {
		if (isAuthenticated) {
			logout(
				`${window.origin}/questionnaire/${survey}/unite-enquetee/${unit}/deconnexion`
			);
		} else {
			login(getCallBack({ survey, unit }));
		}
	}, [isAuthenticated, login, logout, survey, unit]);

	return (
		<CloneElements<HeaderProps>
			isAuthenticated={isAuthenticated}
			handleOidcAuth={handleOidcAuth}
		>
			{children}
		</CloneElements>
	);
}
