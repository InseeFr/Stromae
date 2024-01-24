import type { SurveyUnitData } from '../../typeStromae/type';
import { authenticatedGetRequest } from '../commons/axios-utils';
import moize from 'moize';
import { surveyUnit } from './api';

export const getSurveyUnitData = (BASE_URL: string) =>
	moize(
		async (unit: string, token?: string): Promise<SurveyUnitData> => {
			const { data, stateData, personalization } =
				await authenticatedGetRequest<SurveyUnitData>(
					surveyUnit(BASE_URL, unit),
					token
				);

			return { data, stateData, personalization };
		},
		{ isPromise: true }
	);
