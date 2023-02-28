import { LunaticData } from '../../typeLunatic/type';
import type { SurveyUnitData } from '../../typeStromae/type';
import { authenticatedRequest, HTTP_VERBS } from '../commons/axios-utils';
import { surveyUnitData } from './api';

const getSurveyUnitData =
	(BASE_URL: string) =>
	async (unit: string, token: string): Promise<SurveyUnitData> => {
		const data = await authenticatedRequest<LunaticData>(
			HTTP_VERBS.get,
			surveyUnitData(BASE_URL, unit),
			token
		);

		// TODO get personalization and stateData

		return { data };
	};

export default getSurveyUnitData;
