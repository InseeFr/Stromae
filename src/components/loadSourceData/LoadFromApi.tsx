import { PropsWithChildren, useCallback } from 'react';
import { loadSourceDataContext } from './LoadSourceDataContext';
import { useOidcAccessToken } from '../../lib/oidc';
import { surveyApi } from '../../lib/surveys/surveysApi';

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
			try {
				if (accessToken && unit) {
					return await surveyApi.getSurveyUnitData(unit, accessToken);
				}
			} catch (e) {
				// TODO
			}
		},
		[unit, accessToken]
	);

	const getRequiredNomenclatures = useCallback(
		async function () {
			if (survey && accessToken) {
				const required = await surveyApi.getRequiredNomenclatures(
					survey,
					accessToken
				);

				const nomenclatures = await Promise.all(
					required.map(function (name) {
						return surveyApi.getNomenclature(name, accessToken);
					})
				)
					.then(function (results) {
						return results.reduce(function (a, data, index) {
							return { ...a, [required[index]]: data };
						}, {});
					})
					.catch(function (e) {
						// TODO notifier l'utilisateur : voir avec Julia.
						throw e;
					});

				return nomenclatures;
			}
		},
		[survey, accessToken]
	);

	return (
		<loadSourceDataContext.Provider
			value={{
				getMetadata,
				getSurvey,
				getSurveyUnitData,
				getRequiredNomenclatures,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}
