import type { SurveyUnitData } from '../../typeStromae/type';
import { authenticatedGetRequest } from '../commons/axios-utils';

import { surveyUnit } from './api';

export const getSurveyUnitData =
	(conf: Promise<any>) =>
	async (unit: string, token: string): Promise<SurveyUnitData> => {
		const { data, stateData, personalization } = await conf.then((data) =>
			authenticatedGetRequest<SurveyUnitData>(
				surveyUnit(data.REACT_APP_SURVEY_API_BASE_URL, unit),
				token
			)
		);

		return { data, stateData, personalization };
	};
