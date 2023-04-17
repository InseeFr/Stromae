import { authenticatedGetRequest } from '../commons/axios-utils';
import { LunaticSource } from '../../typeLunatic/type-source';

import { surveySource } from './api';

/**
 * An endpoint to stromae-api for retrieving resource URLs.
 */
export const getSurvey =
	(BASE_URL: string) =>
	(survey: string, token: string): Promise<LunaticSource> => {
		return authenticatedGetRequest<LunaticSource>(
			surveySource(BASE_URL, survey),
			token
		);
	};
