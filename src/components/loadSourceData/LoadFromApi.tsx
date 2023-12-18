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

export function LoadFromApi({
	survey,
	unit,
	children,
}: PropsWithChildren<LoadFromApiProps>) {
	const isOidcEnabled = AUTH_TYPE === AuthTypeEnum.Oidc;

	const { accessToken } = useAccessToken();

	const getMetadata = useCallback(async () => {
		if (survey) {
			return surveyApi.getMetadataSurvey(survey);
		}
		return undefined;
	}, [survey]);

	const getSurvey = useCallback(async () => {
		if (survey && ((isOidcEnabled && accessToken) || !isOidcEnabled)) {
			return surveyApi.getSurvey(survey, accessToken);
		}
		return undefined;
	}, [survey, isOidcEnabled, accessToken]);

	const getSurveyUnitData = useCallback(async () => {
		if (unit && ((isOidcEnabled && accessToken) || !isOidcEnabled)) {
			return surveyApi.getSurveyUnitData(unit, accessToken);
		}
		return undefined;
	}, [unit, isOidcEnabled, accessToken]);

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
			if (state && unit && ((isOidcEnabled && accessToken) || !isOidcEnabled)) {
				await surveyApi.putSurveyUnitStateData(state, unit, accessToken);
			}

			return true;
		},
		[accessToken, isOidcEnabled, unit]
	);

	const putSurveyUnitData = useCallback(
		async (data?: DataVariables) => {
			try {
				if (data) {
					if (unit && ((isOidcEnabled && accessToken) || !isOidcEnabled)) {
						await surveyApi.putSurveyUnitData(data, unit, accessToken);
					}
				}
			} catch (e) {
				console.warn(e);
				return false;
			}
			return true;
		},
		[accessToken, isOidcEnabled, unit]
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
