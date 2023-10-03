import { PropsWithChildren, useCallback } from 'react';
import { surveyApi } from '../../lib/surveys/surveysApi';
import { DataVariables, StateData } from '../../typeStromae/type';

import { useAccessToken } from '../../lib/oidc';
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
			try {
				if (state && unit) {
					await surveyApi.putSurveyUnitStateData(state, unit, accessToken);
				}
			} catch (e) {
				console.warn(e);
				return false;
			}
			return true;
		},
		[accessToken, unit]
	);

	const putSurveyUnitData = useCallback(
		async (data?: DataVariables) => {
			try {
				if (data) {
					if (unit) {
						await surveyApi.putSurveyUnitData(data, unit, accessToken);
					}
				}
			} catch (e) {
				console.warn(e);
				return false;
			}
			return true;
		},
		[accessToken, unit]
	);

	return (
		<loadSourceDataContext.Provider
			value={{
				getMetadata,
				getSurvey,
				getSurveyUnitData,
				putSurveyUnitStateData,
				getReferentiel,
				putSurveyUnitData,
				getDepositProof,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}
