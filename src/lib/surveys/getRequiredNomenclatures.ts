import { getRequest } from '../commons/axios-utils';
import { requiredNomenclature } from './api';

export const getRequiredNomenclatures =
	(BASE_URL: string) =>
	(survey: string): Promise<Array<string>> => {
		return getRequest<Array<string>>(requiredNomenclature(BASE_URL, survey));
	};
