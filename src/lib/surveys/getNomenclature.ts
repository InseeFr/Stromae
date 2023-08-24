import { authenticatedGetRequest } from '../commons/axios-utils';
import { nomenclature } from './api';

export const getNomenclature =
	(conf: Promise<any>) =>
	(name: string, token: string): Promise<Array<unknown>> => {
		return conf.then((data) =>
			authenticatedGetRequest<Array<unknown>>(
				nomenclature(data.REACT_APP_SURVEY_API_BASE_URL, name),
				token
			)
		);
	};
