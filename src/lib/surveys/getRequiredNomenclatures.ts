import { authenticatedGetRequest } from '../commons/axios-utils';

import { requiredNomenclature } from './api';

export const getRequiredNomenclatures =
	(conf: Promise<any>) =>
	(survey: string, token: string): Promise<Array<string>> => {
		return conf.then((data) =>
			authenticatedGetRequest<Array<string>>(
				requiredNomenclature(data.REACT_APP_SURVEY_API_BASE_URL, survey),
				token
			)
		);
	};
