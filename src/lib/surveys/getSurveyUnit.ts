import type { SurveyUnitData } from '../../typeStromae/type';
import { authenticatedGetRequest } from '../commons/axios-utils';
import { surveyUnit } from './api';

export const getSurveyUnitData =
	(BASE_URL: string) =>
	async (unit: string, token: string): Promise<SurveyUnitData> => {
		try {
			const { data, stateData, personalization } =
				await authenticatedGetRequest<SurveyUnitData>(
					surveyUnit(BASE_URL, unit),
					token
				);

			return { data, stateData, personalization };
		} catch (e) {
			throw e;
		}
	};
