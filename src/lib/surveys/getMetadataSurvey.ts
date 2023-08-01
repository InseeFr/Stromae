import { MetadataSurvey } from '../../typeStromae/type';
import { getRequest } from '../commons/axios-utils';

import * as API from './api';

export const getMetadataSurvey =
	(BASE_URL: string) =>
	async (survey: string): Promise<MetadataSurvey> => {
		const url = API.surveyMetada(BASE_URL, survey);
		return getRequest<MetadataSurvey>(url);
	};
