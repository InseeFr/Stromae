import { DataVariables } from '../../typeStromae/type';
import { authenticatedPutRequest } from '../commons/axios-utils';
import { surveyUnitDataUrl } from './api';

export const putSurveyUnitData =
	(domain: string) =>
	async (data: DataVariables, unit: string, token: string) => {
		try {
			await authenticatedPutRequest<DataVariables>(
				surveyUnitDataUrl(domain, unit),
				data,
				token
			);
		} catch (e) {
			throw e;
		}
	};
