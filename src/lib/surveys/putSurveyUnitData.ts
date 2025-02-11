import { DataVariables } from '../../typeStromae/type';
import { authenticatedPutRequest } from '../commons/axios-utils';

import { surveyUnitDataUrl } from './api';

export const putSurveyUnitData =
	(domain: string) => (data: DataVariables, unit: string) => {
		return authenticatedPutRequest<DataVariables>(
			surveyUnitDataUrl(domain, unit),
			data
		);
	};
