import moize from 'moize';
import { MetadataSurvey } from '../../typeStromae/type';
import { publicGetRequest } from '../commons/axios-utils';

import * as API from './api';

export const getMetadataSurvey = (conf: Promise<any>) =>
	moize(async (survey: string): Promise<MetadataSurvey> => {
		const url = await conf.then((data) =>
			API.surveyMetada(data.REACT_APP_SURVEY_API_BASE_URL, survey)
		);
		return publicGetRequest<MetadataSurvey>(url);
	});
