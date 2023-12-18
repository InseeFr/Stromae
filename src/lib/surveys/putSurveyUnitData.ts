import { DataVariables } from '../../typeStromae/type';
import { authenticatedPutRequest } from '../commons/axios-utils';

import { surveyUnitDataUrl } from './api';

export const putSurveyUnitData =
	(domain: string) =>
	(data: DataVariables, unit: string, token: string | undefined) => {
		return authenticatedPutRequest<DataVariables>(
			surveyUnitDataUrl(domain, unit),
			data,
			token
		);
	};
