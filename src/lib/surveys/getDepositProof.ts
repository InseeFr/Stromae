import { authenticatedGetBlob } from '../commons/axios-utils';
import { depositProof } from './api';

export const getDepositProof =
	(baseUrl: string) => async (unit: string, token: string | undefined) => {
		return authenticatedGetBlob(depositProof(baseUrl, unit), token);
	};
