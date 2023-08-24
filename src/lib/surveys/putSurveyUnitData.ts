import { DataVariables } from '../../typeStromae/type';
import { authenticatedPutRequest } from '../commons/axios-utils';

import { surveyUnitDataUrl } from './api';

export const putSurveyUnitData =
	(conf: Promise<any>) =>
	(data: DataVariables, unit: string, token: string) => {
		return conf.then((asyncData) =>
			authenticatedPutRequest<DataVariables>(
				surveyUnitDataUrl(asyncData.REACT_APP_SURVEY_API_BASE_URL, unit),
				data,
				token
			)
		);
	};
