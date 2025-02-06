import { PropsWithChildren, useCallback, useMemo } from 'react';

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
	const getMetadata = useCallback(async () => {
		if (survey) {
			return surveyApi.getMetadataSurvey(survey);
		}
		return undefined;
	}, [survey]);

	const getSurvey = useCallback(async () => {
		if (survey) {
			return surveyApi.getSurvey(survey);
		}
		return undefined;
	}, [survey]);

	const getSurveyUnitData = useCallback(
		async (refresh?: boolean) => {
			if (unit) {
				if (refresh) {
					return surveyApi.getFreshSurveyUnitData(unit);
				}

				return surveyApi.getSurveyUnitData(unit);
			}
			return undefined;
		},
		[unit]
	);

	const getReferentiel = useCallback(async (name: string) => {
		return surveyApi.getNomenclature(name);
	}, []);

	const getDepositProof = useCallback(async (unit: string) => {
		return surveyApi.getDepositiProof(unit);
	}, []);

	const putSurveyUnitStateData = useCallback(
		async (state?: StateData) => {
			if (state && unit) {
				await surveyApi.putSurveyUnitStateData(state, unit);
			}

			return true;
		},
		[unit]
	);

	const putSurveyUnitData = useCallback(
		async (data?: DataVariables) => {
			if (data) {
				if (unit) {
					await surveyApi.putSurveyUnitData(data, unit);
				}
			}

			return true;
		},
		[unit]
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
