import { authenticatedGetRequest } from '../commons/axios-utils';
import { nomenclature } from './api';

export const getNomenclature =
	(BASE_URL: string) =>
	(name: string): Promise<Array<unknown>> => {
		return authenticatedGetRequest<Array<unknown>>(
			nomenclature(BASE_URL, name)
		);
	};
