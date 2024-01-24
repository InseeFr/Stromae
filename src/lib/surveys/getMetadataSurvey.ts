import moize from 'moize';
import { MetadataSurvey } from '../../typeStromae/type';
import { publicGetRequest } from '../commons/axios-utils';
import * as API from './api';

export const getMetadataSurvey = (BASE_URL: string) =>
	moize(
		async (survey: string): Promise<MetadataSurvey> => {
			const url = API.surveyMetada(BASE_URL, survey);
			return publicGetRequest<MetadataSurvey>(url);
		},
		{ isPromise: true }
	);
