import { authenticatedGetBlob } from '../commons/axios-utils';
import { depositProof } from './api';

export const getDepositProof =
	(BASE_URL: string) => async (unit: string, token: string) => {
		return authenticatedGetBlob(depositProof(BASE_URL, unit), token);
	};
