import { LunaticSource } from '../../typeLunatic/type-source';
import { authenticatedGetRequest } from '../commons/axios-utils';
import moize from 'moize';
import { surveySource } from './api';

/**
 * An endpoint to stromae-api for retrieving resource URLs.
 */
export const getSurvey = (BASE_URL: string) =>
	moize(
		(survey: string, token?: string): Promise<LunaticSource> => {
			return authenticatedGetRequest<LunaticSource>(
				surveySource(BASE_URL, survey),
				token
			);
		},
		{ isPromise: true }
	);
