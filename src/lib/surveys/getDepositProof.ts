import { getBlob } from '../commons/axios-utils';
import { depositProof } from './api';

export const getDepositProof = (baseUrl: string) => async (unit: string) => {
	return getBlob(depositProof(baseUrl, unit));
};
