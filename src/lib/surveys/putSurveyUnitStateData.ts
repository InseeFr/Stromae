import { StateData } from '../../typeStromae/type';
import { authenticatedPutRequest } from '../commons/axios-utils';

import { surveyUnitStateDataUrl } from './api';

export const putSurveyUnitStateData =
	(conf: Promise<any>) =>
	async (state: StateData, unit: string, token: string) => {
		await conf.then((data) =>
			authenticatedPutRequest<StateData>(
				surveyUnitStateDataUrl(data.REACT_APP_SURVEY_API_BASE_URL, unit),
				state,
				token
			)
		);
	};
