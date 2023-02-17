import type { SurveyUnitData } from '../../typeStromae/type';
import { authenticatedRequest, HTTP_VERBS } from '../commons/axios-utils';
import { surveyUnitData } from './api';

const getSurveyUnitData =
	(BASE_URL: string) =>
	async (unit: string, token: string): Promise<SurveyUnitData> => {
		return await authenticatedRequest<SurveyUnitData>(
			HTTP_VERBS.get,
			surveyUnitData(BASE_URL, unit),
			token
		);
	};

export default getSurveyUnitData;
