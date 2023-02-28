import { authenticatedRequest, HTTP_VERBS } from '../commons/axios-utils';
import { requiredNomenclature } from './api';

export const getRequiredNomenclatures =
	(BASE_URL: string) =>
	async (survey: string, token: string): Promise<Array<string>> => {
		return await authenticatedRequest<Array<string>>(
			HTTP_VERBS.get,
			requiredNomenclature(BASE_URL, survey),
			token
		);
	};
