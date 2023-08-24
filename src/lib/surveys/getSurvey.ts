import { authenticatedGetRequest } from '../commons/axios-utils';
import { LunaticSource } from '../../typeLunatic/type-source';

import { surveySource } from './api';

/**
 * An endpoint to stromae-api for retrieving resource URLs.
 */
export const getSurvey =
	(conf: Promise<any>) =>
	(survey: string, token: string): Promise<LunaticSource> => {
		return conf.then((data) =>
			authenticatedGetRequest<LunaticSource>(
				surveySource(data.REACT_APP_SURVEY_API_BASE_URL, survey),
				token
			)
		);
	};
