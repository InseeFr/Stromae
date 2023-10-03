import { StateData } from '../../typeStromae/type';
import { authenticatedPutRequest } from '../commons/axios-utils';

import { surveyUnitStateDataUrl } from './api';

export const putSurveyUnitStateData =
	(domain: string) =>
	async (state: StateData, unit: string, token: string | undefined) => {
		await authenticatedPutRequest<StateData>(
			surveyUnitStateDataUrl(domain, unit),
			state,
			token
		);
	};
