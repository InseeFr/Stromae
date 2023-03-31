import { PropsWithChildren, useCallback } from 'react';
import { loadSourceDataContext } from './LoadSourceDataContext';
import { useOidcAccessToken } from '../../lib/oidc';
import { surveyApi } from '../../lib/surveys/surveysApi';
import { DataVariables, StateData } from '../../typeStromae/type';

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

	const getMetadata = useCallback(
		async function () {
			if (survey) {
				return await surveyApi.getMetadataSurvey(survey);
			}
		},
		[survey]
	);

	const getSurvey = useCallback(
		async function () {
			if (survey && accessToken) {
				return await surveyApi.getSurvey(survey, accessToken);
			}
		},
		[survey, accessToken]
	);

	const getSurveyUnitData = useCallback(
		async function () {
			if (accessToken && unit) {
				return await surveyApi.getSurveyUnitData(unit, accessToken);
			}
		},
		[unit, accessToken]
	);

	const getReferentiel = useCallback(
		async function (name: string) {
			return surveyApi.getNomenclature(name, accessToken);
		},
		[accessToken]
	);

	const putSurveyUnitData = useCallback(
		async function (
			args: { data: DataVariables; state: StateData } | undefined
		) {
			try {
				if (args) {
					const { data, state } = args;
					if (unit) {
						await surveyApi.putSurveyUnitData(data, unit, accessToken);
						await surveyApi.putSurveyUnitStateData(state, unit, accessToken);
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
				getReferentiel,
				putSurveyUnitData,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}
