import { surveySource } from './api';
import { authenticatedRequest, HTTP_VERBS } from '../commons/axios-utils';
import { LunaticSource } from '../../typeLunatic/type-source';

/**
 * Un endpoint vers stromae-api pour recup les url des resources.
 *
 * @param survey
 * @returns
 */
export const getSurvey =
	(BASE_URL: string) =>
	async (survey: string, token: string): Promise<LunaticSource> => {
		return await authenticatedRequest<LunaticSource>(
			HTTP_VERBS.get,
			surveySource(BASE_URL, survey),
			token
		);
	};
