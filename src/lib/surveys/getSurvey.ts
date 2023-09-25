import { getRequest } from '../commons/axios-utils';
import { LunaticSource } from '../../typeLunatic/type-source';

import { surveySource } from './api';

/**
 * An endpoint to stromae-api for retrieving resource URLs.
 */
export const getSurvey =
	(BASE_URL: string) =>
	(survey: string): Promise<LunaticSource> => {
		return getRequest<LunaticSource>(surveySource(BASE_URL, survey));
	};
