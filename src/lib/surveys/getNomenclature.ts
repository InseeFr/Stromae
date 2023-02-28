import { nomenclature } from './api';
import { authenticatedRequest, HTTP_VERBS } from '../commons/axios-utils';

const getNomenclature =
	(BASE_URL: string) =>
	async (name: string, token: string): Promise<Array<any>> => {
		return await authenticatedRequest<Array<any>>(
			HTTP_VERBS.get,
			nomenclature(BASE_URL, name),
			token
		);
	};

export default getNomenclature;
