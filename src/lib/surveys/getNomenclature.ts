import { getRequest } from '../commons/axios-utils';
import { nomenclature } from './api';

export const getNomenclature =
	(BASE_URL: string) =>
	(name: string): Promise<Array<unknown>> => {
		return getRequest<Array<unknown>>(nomenclature(BASE_URL, name));
	};
