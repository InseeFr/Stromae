import { useCallback } from 'react';
import { useParams } from 'react-router';
import {
	uri404,
	uriDeconnexion,
	uriSurvey,
	uriSurveyUnit,
} from '../../lib/domainUri';
import { useAuth } from '../../lib/oidc';
import { CloneElements } from '../orchestrator/CloneElements';
import { HeaderProps } from './Header';

type HeaderAuthProps = {
	children: JSX.Element;
};

function isOnPostCollectPage() {
	return window.location.pathname.endsWith('/post-envoi');
}

function getLogInRedirectionUri(args: { survey?: string; unit?: string }) {
	const { survey, unit } = args;
	if (survey && unit) {
		return uriSurveyUnit(survey, unit);
	}
	if (survey) {
		return uriSurvey(survey);
	}
	return uri404();
}

function getLogOutRedirectionUri(args: { survey?: string; unit?: string }) {
	const { survey, unit } = args;
	if (survey && isOnPostCollectPage()) {
		return uriSurvey(survey);
	}
	if (survey && unit) {
		return uriDeconnexion(survey, unit);
	}
	return uri404();
}

export function HeaderAuth({ children }: HeaderAuthProps) {
	const { login, logout, isAuthenticated } = useAuth();
	const { survey, unit } = useParams();

	const handleOidcAuth = useCallback(() => {
		if (isAuthenticated) {
			logout(getLogOutRedirectionUri({ survey, unit }));
		} else {
			login(getLogInRedirectionUri({ survey, unit }));
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
