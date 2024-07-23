import { PropsWithChildren, useCallback, useMemo } from 'react';
import { useAccessToken } from '../../lib/oidc';
import { surveyApi } from '../../lib/surveys/surveysApi';
import { DataVariables, StateData } from '../../typeStromae/type';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';
import { loadSourceDataContext } from './LoadSourceDataContext';

type LoadFromApiProps = {
	survey?: string;
	unit?: string;
};

const { AUTH_TYPE } = environment;
const isOidcEnabled = AUTH_TYPE === AuthTypeEnum.Oidc;

export function LoadFromApi({
	survey,
	unit,
	children,
}: PropsWithChildren<LoadFromApiProps>) {
	const { accessToken } = useAccessToken();
	const isTokenReady = (isOidcEnabled && accessToken) || !isOidcEnabled;

	const getMetadata = useCallback(async () => {
		if (survey) {
			return surveyApi.getMetadataSurvey(survey);
		}
		return undefined;
	}, [survey]);

	const getSurvey = useCallback(async () => {
		if (survey && isTokenReady) {
			return surveyApi.getSurvey(survey, accessToken);
		}
		return undefined;
	}, [survey, isTokenReady, accessToken]);

	const getSurveyUnitData = useCallback(
		async (refresh?: boolean) => {
			if (unit && isTokenReady) {
				if (refresh) {
					return surveyApi.getFreshSurveyUnitData(unit, accessToken);
				}

				return surveyApi.getSurveyUnitData(unit, accessToken);
			}
			return undefined;
		},
		[unit, isTokenReady, accessToken]
	);

	const getReferentiel = useCallback(
		async (name: string) => {
			return surveyApi.getNomenclature(name, accessToken);
		},
		[accessToken]
	);

	const getDepositProof = useCallback(
		async (unit: string) => {
			return surveyApi.getDepositiProof(unit, accessToken);
		},
		[accessToken]
	);

	const putSurveyUnitStateData = useCallback(
		async (state?: StateData) => {
			if (state && unit && isTokenReady) {
				await surveyApi.putSurveyUnitStateData(state, unit, accessToken);
			}

			return true;
		},
		[accessToken, isTokenReady, unit]
	);

	const putSurveyUnitData = useCallback(
		async (data?: DataVariables) => {
			if (data) {
				if (unit && isTokenReady) {
					await surveyApi.putSurveyUnitData(data, unit, accessToken);
				}
			}

			return true;
		},
		[accessToken, isTokenReady, unit]
	);

	const contextValue = useMemo(
		() => ({
			getMetadata,
			getSurvey,
			getSurveyUnitData,
			putSurveyUnitStateData,
			getReferentiel,
			putSurveyUnitData,
			getDepositProof,
		}),
		[
			getDepositProof,
			getMetadata,
			getReferentiel,
			getSurvey,
			getSurveyUnitData,
			putSurveyUnitData,
			putSurveyUnitStateData,
		]
	);

	return (
		<loadSourceDataContext.Provider value={contextValue}>
			{children}
		</loadSourceDataContext.Provider>
	);
}
