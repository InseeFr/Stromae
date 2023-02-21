import { PropsWithChildren, useCallback } from 'react';
import { loadSourceDataContext } from './LoadSourceDataContext';
import { useOidcAccessToken } from '../../lib/oidc';
import surveyApi from '../../lib/surveys/surveysApi';

type LoadFromApiProps = {
	survey?: string;
	unit?: string;
};

function LoadFromApi({
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

	return (
		<loadSourceDataContext.Provider
			value={{ getMetadata, getSurvey, getSurveyUnitData }}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}

export default LoadFromApi;
