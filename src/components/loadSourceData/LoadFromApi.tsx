import { PropsWithChildren, useCallback } from 'react';

import { useOidcAccessToken } from '../../lib/oidc';
import { surveyApi } from '../../lib/surveys/surveysApi';
import { DataVariables, StateData } from '../../typeStromae/type';

import { loadSourceDataContext } from './LoadSourceDataContext';

type LoadFromApiProps = {
	survey?: string;
	unit?: string;
};

export function LoadFromApi({
	survey,
	unit,
	children,
}: PropsWithChildren<LoadFromApiProps>) {
	const { accessToken } = useOidcAccessToken();

	const getMetadata = useCallback(async () => {
		if (survey) {
			return surveyApi.getMetadataSurvey(survey);
		}
		return undefined;
	}, [survey]);

	const getSurvey = useCallback(async () => {
		if (survey && accessToken) {
			return surveyApi.getSurvey(survey, accessToken);
		}
		return undefined;
	}, [survey, accessToken]);

	const getSurveyUnitData = useCallback(async () => {
		if (accessToken && unit) {
			return surveyApi.getSurveyUnitData(unit, accessToken);
		}
		return undefined;
	}, [unit, accessToken]);

	const getReferentiel = useCallback(
		async (name: string) => {
			return surveyApi.getNomenclature(name, accessToken);
		},
		[accessToken]
	);

	const putSurveyUnitData = useCallback(
		async (args: { data: DataVariables; state: StateData } | undefined) => {
			try {
				if (args) {
					const { data, state } = args;
					if (unit) {
						await surveyApi.putSurveyUnitData(data, unit, accessToken);
						await surveyApi.putSurveyUnitStateData(state, unit, accessToken);
					}
				}
			} catch (e) {
				// eslint-disable-next-line no-console
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
				getReferentiel,
				putSurveyUnitData,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}
