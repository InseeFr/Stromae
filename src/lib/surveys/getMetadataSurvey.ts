import { HeaderType } from '../../components/Header/HeaderType';
import { FooterType } from '../../components/footer/FooterType';
import { publicGetRequest } from '../commons/axios-utils';

import * as API from './api';

export interface MetadataSurvey {
	Header: HeaderType;
	Footer: FooterType;
}

export const getMetadataSurvey =
	(BASE_URL: string) =>
	async (survey: string): Promise<MetadataSurvey> => {
		const url = API.surveyMetada(BASE_URL, survey);
		return publicGetRequest<MetadataSurvey>(url);
	};
