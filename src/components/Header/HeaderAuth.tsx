import { useCallback } from 'react';
import { useParams } from 'react-router';
import { useOidc } from '../../lib/oidc';
import { CloneElements } from '../orchestrator/CloneElements';
import { HeaderProps } from './Header';
import {
	uriSurveyUnit,
	uriSurvey,
	uri404,
	uriDeconnexion,
} from '../../lib/domainUri';
import { CollectStatusEnum } from '../../typeStromae/type';

type HeaderAuthProps = {
	children: JSX.Element;
	collectStatus?: CollectStatusEnum | null;
};

function getCallBack(args: { survey?: string; unit?: string }) {
	const { survey, unit } = args;
	if (survey && unit) {
		return uriSurveyUnit(survey, unit);
	}
	if (survey) {
		return uriSurvey(survey);
	}
	return uri404();
}

function getLogOutUri(args: {
	survey?: string;
	unit?: string;
	collectStatus?: CollectStatusEnum | null;
}) {
	const { survey, unit, collectStatus } = args;
	if (collectStatus === CollectStatusEnum.Validated && survey) {
		return uriSurvey(survey);
	}
	if (survey && unit) {
		return uriDeconnexion(survey, unit);
	}
	return uri404();
}

export function HeaderAuth({ children, collectStatus }: HeaderAuthProps) {
	const { login, logout, isAuthenticated } = useOidc();
	const { survey, unit } = useParams();

	const handleOidcAuth = useCallback(() => {
		if (isAuthenticated) {
			logout(getLogOutUri({ survey, unit, collectStatus }));
		} else {
			login(getCallBack({ survey, unit }));
		}
	}, [isAuthenticated, login, logout, survey, unit, collectStatus]);

	return (
		<CloneElements<HeaderProps>
			isAuthenticated={isAuthenticated}
			handleOidcAuth={handleOidcAuth}
		>
			{children}
		</CloneElements>
	);
}
