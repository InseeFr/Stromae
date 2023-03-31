import type { SurveyUnitData } from '../../typeStromae/type';
import { authenticatedRequest, HTTP_VERBS } from '../commons/axios-utils';
import { surveyUnitData } from './api';

export const getSurveyUnitData =
	(BASE_URL: string) =>
	async (unit: string, token: string): Promise<SurveyUnitData> => {
		try {
			const { data, stateData, personalization } =
				await authenticatedRequest<SurveyUnitData>(
					HTTP_VERBS.get,
					surveyUnitData(BASE_URL, unit),
					token
				);

			return { data, stateData, personalization };
		} catch (e) {
			throw e;
		}
	};
