import { authenticatedGetRequest } from '../commons/axios-utils';

import { requiredNomenclature } from './api';

export const getRequiredNomenclatures =
	(BASE_URL: string) =>
	(survey: string, token: string): Promise<Array<string>> => {
		return authenticatedGetRequest<Array<string>>(
			requiredNomenclature(BASE_URL, survey),
			token
		);
	};
