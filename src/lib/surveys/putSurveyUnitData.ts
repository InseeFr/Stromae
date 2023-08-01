import { DataVariables } from '../../typeStromae/type';
import { putRequest } from '../commons/axios-utils';
import { surveyUnitDataUrl } from './api';

export const putSurveyUnitData =
	(domain: string) => (data: DataVariables, unit: string) => {
		return putRequest<DataVariables>(surveyUnitDataUrl(domain, unit), data);
	};
