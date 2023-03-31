import { nomenclature } from './api';
import { authenticatedGetRequest } from '../commons/axios-utils';

export const getNomenclature =
	(BASE_URL: string) =>
	async (name: string, token: string): Promise<Array<unknown>> => {
		return await authenticatedGetRequest<Array<unknown>>(
			nomenclature(BASE_URL, name),
			token
		);
	};
