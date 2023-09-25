import type { SurveyUnitData } from '../../typeStromae/type';
import { getRequest } from '../commons/axios-utils';
import { surveyUnit } from './api';

export const getSurveyUnitData =
	(BASE_URL: string) =>
	async (unit: string): Promise<SurveyUnitData> => {
		const { data, stateData, personalization } =
			await getRequest<SurveyUnitData>(surveyUnit(BASE_URL, unit));

		return { data, stateData, personalization };
	};
