import { PropsWithChildren, useCallback } from 'react';
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

	const getSurveyUnitData = useCallback(async () => {
		if (unit) {
			return surveyApi.getSurveyUnitData(unit);
		}
		return undefined;
	}, [unit]);

	const getReferentiel = useCallback(async (name: string) => {
		return surveyApi.getNomenclature(name);
	}, []);

	const getDepositProof = useCallback(async (unit: string) => {
		return surveyApi.getDepositiProof(unit);
	}, []);

	const putSurveyUnitStateData = useCallback(
		async (state?: StateData) => {
			try {
				if (state) {
					if (unit) {
						await surveyApi.putSurveyUnitStateData(state, unit);
					}
				}
			} catch (e) {
				// eslint-disable-next-line no-console
				console.warn(e);
				return false;
			}
			return true;
		},
		[unit]
	);

	const putSurveyUnitData = useCallback(
		async (args: { data: DataVariables; state: StateData } | undefined) => {
			try {
				if (args) {
					const { data, state } = args;
					if (unit) {
						await surveyApi.putSurveyUnitData(data, unit);
						await surveyApi.putSurveyUnitStateData(state, unit);
					}
				}
			} catch (e) {
				// eslint-disable-next-line no-console
				console.warn(e);
				return false;
			}
			return true;
		},
		[unit]
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
