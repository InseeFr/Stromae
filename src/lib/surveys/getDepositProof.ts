import { authenticatedGetBlob } from '../commons/axios-utils';
import { depositProof } from './api';

export const getDepositProof =
	(conf: Promise<any>) => async (unit: string, token: string) => {
		return conf.then((data) =>
			authenticatedGetBlob(
				depositProof(data.REACT_APP_SURVEY_API_BASE_URL, unit),
				token
			)
		);
	};
